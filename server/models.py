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
    image_path = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=True)

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules=('-order_items.product', '-category.product', '-order_items.order', '-cart_items.product', '-inventory.product',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
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

    serialize_rules = ('-order_items.order', '-address.order',)

    id = db.Column(db.String, primary_key=True, default=str(uuid.uuid4()))
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, nullable=False)
    tax = db.Column(db.Float, nullable=False)

    address_id = db.Column(db.Integer, db.ForeignKey('addresses.id'))

    address = db.relationship('Address', backref='order', uselist=False, foreign_keys=[address_id])
    order_items = db.relationship('OrderItem', backref='order')

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    serialize_rules=('-order.order_items', '-product.order_items', '-address.order_items', '-size.order_items',)

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    
    size_id = db.Column(db.Integer, db.ForeignKey('sizes.id'))
    size = db.relationship('Size', backref='order_items')
    order_id = db.Column(db.String, db.ForeignKey('orders.id'), default=str(uuid.uuid4()))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

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
    cart_id = db.Column(db.String, db.ForeignKey('carts.id'))
    image_path = db.Column(db.String)

    size_id = db.Column(db.Integer, db.ForeignKey('sizes.id'))

class Address(db.Model, SerializerMixin):
    __tablename__ = "addresses"

    serialize_rules = ('-orders.address',)

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    line1 = db.Column(db.String, nullable=False)
    line2 = db.Column(db.String)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False) 

class Size(db.Model, SerializerMixin):
    __tablename__ = "sizes"

    serialize_rules = ('-inventory.size', '-order_items.size',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True) 
    gender_category = db.Column(db.String, nullable=True) 

class Inventory(db.Model, SerializerMixin):
    __tablename__ = "inventory"
    serialize_rules = ('-product.inventory', '-size.inventory',)

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    size_id = db.Column(db.Integer, db.ForeignKey('sizes.id'))
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', backref='inventory')
    size = db.relationship('Size', backref='inventory')

   






