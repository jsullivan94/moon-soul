from flask import request, make_response, jsonify, session, Flask
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import uuid


import json
import os
import stripe 


from config import *
from models import *


load_dotenv()



# stripe tests
stripe.api_key = os.getenv("SK_TEST")

def calculate_order_amount(items):
    total = 0

    for item in items:
        
        total += item['quantity'] * item['price']

    total_in_cents = int(total * 100)

    return total_in_cents



@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
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
    















@app.route('/')
def index():
    return '<h1>Moon Soul</h1>'

@app.get('/admins')
def get_all_admins():
    admins = Admin.query.all()

    data = [admin.to_dict() for admin in admins]

    return make_response(
        jsonify(data),
        200
    )


@app.get('/events')
def get_all_events():
    events = Event.query.all()
    
    data = [event.to_dict() for event in events]

    return make_response(
        jsonify(data),
        200
    )

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

    new_cart_item = CartItem(
        product_id = data.get('product_id'),
        quantity = data.get('quantity'),
        price = data.get('price'),
        size = data.get('size'),
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


@app.post('/news_letter')
def post_nl_email():
    data = request.get_json()

    new_email = NewsLetter(
        email = data.get('email')
     )

    db.session.add(new_email)
    db.session.commit()

    return make_response(
        jsonify(new_email.to_dict()),
        201
    )







if __name__ == '__main__':
    app.run(port=5555, debug=True)