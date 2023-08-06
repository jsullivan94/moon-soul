from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
import uuid

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

    serialize_rules=('-order_items.product', '-category.product', '-order_items.order', '-cart_items.product')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    inventory = db.Column(db.Integer)
    image_path = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    cart_items = db.relationship('CartItem', backref='product')
    order_items = db.relationship('OrderItem', backref='product')

class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    serialize_rules=('-products.category',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    products = db.relationship('Product', backref='category')

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    serialize_rules=('-order_items.order',)

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    order_items = db.relationship('OrderItem', backref='order')

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    serialize_rules=('-order.order_items', '-product.order_items',)

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    serialize_rules=('-orders.customer',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    orders = db.relationship('Order', backref='customer')

class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    serialize_rules=('-cart_items.cart',)

    id = db.Column(db.String, primary_key=True, default=str(uuid.uuid4()))

    cart_items = db.relationship('CartItem', backref='cart')

class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"

    serialize_rules=('-cart.cart_items', '-product.cart_items',)

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String)
    cart_id = db.Column(db.String, db.ForeignKey('carts.id'))




