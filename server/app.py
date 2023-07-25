from flask import request, make_response, jsonify, session, Flask
from sqlalchemy.exc import IntegrityError

from config import *
from models import *

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




if __name__ == '__main__':
    app.run(port=5555, debug=True)