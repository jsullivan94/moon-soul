from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class Admin(db.Model, SerializerMixin):
    __tablename__ = "admin"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access password hash')
    
    @password_hash.setter
    def password_hash(self, new_pass):
        p_hash = bcrypt.generate_password_hash(new_pass.encode('utf-8'))
        self._password_hash = p_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String, nullable=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=True)

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    inventory = db.Column(db.Integer)
    image_path = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    category = db.relationship('Category', back_populates='products')
    order_items = db.relationship('OrderItem', back_populates='product')

class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='category')

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    total_price = db.Column(db.Float)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    customer = db.relationship('Customer', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    
    order = db.relationship('Order', back_populates='order_items')
    product = db.relationship('Product', back_populates='order_items')


class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    address = db.Column(db.String)

    orders = db.relationship('Order', back_populates='customer')




