from flask import request, make_response, jsonify, session, Flask, render_template
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import uuid
import json
import os
import stripe 
import requests

from config import *
from models import *

load_dotenv()
app.secret_key = os.environ.get('FLASK_SECRET_KEY')
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@app.get('/me/media')
def get_media():
    # Extract query parameters from the frontend request
    fields = request.args.get('fields')
    access_token = request.args.get('access_token')

    # Forward these parameters in a request to the Instagram API
    instagram_api_url = f"https://graph.instagram.com/me/media?fields={fields}&access_token={access_token}"
    response = requests.get(instagram_api_url)

    # Check if the request was successful
    if response.status_code == 200:
        # Send the Instagram API response back to the frontend
        return jsonify(response.json())
    else:
        # Handle any errors
        return jsonify({'error': 'Failed to fetch data from Instagram'}), response.status_code


def calculate_order_amount(items):
    total = 0

    for item in items:
        
        total += item['quantity'] * item['price']

    total_in_cents = int(total * 100)
    print(total_in_cents)
    return total_in_cents

@app.post('/create-payment-intent')
def create_payment():
    try:
        data = json.loads(request.data)

        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data),
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']

        })
    except Exception as e:
        return jsonify(error=str(e)), 403


@app.get('/check_session')
def check_session():
    admin_id = session.get('admin_id')
    admin = Admin.query.filter(Admin.id == admin_id).first()

    if not admin:
        return {'error': 'Unauthorized'}, 401
    
    return admin.to_dict(), 200

@app.post('/signin')
def sign_in():
    data = request.get_json()
    admin = Admin.query.filter(
        Admin.username == data['username']
    ).first()
    
    if not admin or not admin.authenticate(data['password']):
        return {'error': 'Login failed'}, 401
    
    session['admin_id'] = admin.id
    return admin.to_dict(), 201


def get_or_create_cart_id():
   
    cart_id = request.cookies.get('cart_id')

    if cart_id is None:
 
        cart_id = str(uuid.uuid4()) 
        return cart_id, True 
    return cart_id, False


@app.post('/add_to_cart')
def post_cart_item():
    cart_id, was_created = get_or_create_cart_id()

    data = request.get_json()

    cart = Cart.query.filter_by(id=cart_id).first()

    if not cart:
        cart = Cart(id=cart_id)
        db.session.add(cart)

    price = data.get('price')
    quantity = data.get('quantity')
    total_price=price*quantity
    
    new_cart_item = CartItem(
        product_id = data.get('product_id'),
        quantity = data.get('quantity'),
        price = total_price,
        size = data.get('size'),
        image_path = data.get('image_path'),
        cart_id = cart_id
    )
    
    db.session.add(new_cart_item)
    db.session.commit()

    response = make_response(
        jsonify(new_cart_item.to_dict()),
        201
    )

    if was_created:
        response.set_cookie('cart_id', cart_id)
        
    return response


@app.get('/get_cart_items')
def get_cart_items():
    cart_id = request.cookies.get('cart_id')

    if not cart_id:
        return jsonify([])  

    cart_items = CartItem.query.filter_by(cart_id=cart_id).all()

    cart_items_data = [item.to_dict() for item in cart_items]

    return jsonify(cart_items_data)


@app.delete('/delete_cart_item/<int:id>')
def delete_cart_item(id):
    cart_id = request.cookies.get('cart_id')

    cart_item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.id == id).first()


    db.session.delete(cart_item)
    db.session.commit()

    if cart_item is None:
        return jsonify({'message': 'Cart item not found'}), 404
    
    return jsonify({'message': 'Item successfully deleted'}), 200


@app.patch('/update_cart_item/<int:id>')
def update_cart_item(id):
    cart_id = request.cookies.get('cart_id')

    cart_item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.product_id == id).first()

    if cart_item:
        data=request.get_json()

        new_quantity=data.get('quantity')
        new_price=data.get('price')

        cart_item.quantity += new_quantity
        cart_item.price += new_price
        
        db.session.commit()

    if cart_item is None:
        return jsonify({'message': 'Cart item not found'}), 404
    
    response = make_response(
        jsonify(cart_item.to_dict()),
        201
    )
    return response


@app.get('/events')
def get_all_events():
    events = Event.query.all()
    
    data = [event.to_dict() for event in events]

    return make_response(
        jsonify(data),
        200
    )

@app.post('/events')
def post_event():
    data = request.get_json()

    new_event = Event(
        image_path = data.get('image_path'),
        title = data.get('title'),
        date = data.get('date'),
        location = data.get('location'),
        price = data.get('price')

     )

    db.session.add(new_event)
    db.session.commit()

    return make_response(
        jsonify(new_event.to_dict()),
        201
    )

@app.delete('/events/<int:id>')
def delete_event(id):
    
    event = Event.query.get(id)

    if event is None:
        return jsonify({'message': 'Event not found'}), 404

    db.session.delete(event)
    db.session.commit()

    return jsonify({'message': 'Event successfully deleted'}), 200


@app.get('/events/<int:id>')
def get_event_by_id(id):
    event = Event.query.filter(Event.id == id).first()

    return make_response(
        jsonify(event.to_dict()),
        200
    )


@app.get('/products')
def get_all_products():
    products = Product.query.all()

    data = [product.to_dict() for product in products]

    return make_response(
        jsonify(data),
        200
    )


@app.get('/products/<int:id>')
def get_product_by_id(id):
    product = Product.query.filter(Product.id == id).first()

    return make_response(
        jsonify(product.to_dict()),
        200
    )


# @app.post('/news_letter')
# def post_nl_email():
#     data = request.get_json()

#     new_email = NewsLetter(
#         email = data.get('email')
#      )

#     db.session.add(new_email)
#     db.session.commit()

#     return make_response(
#         jsonify(new_email.to_dict()),
#         201
#     )


if __name__ == '__main__':
    app.run(port=5555, debug=True)