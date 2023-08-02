from faker import Faker
from config import db, app
from models import Admin, Event, Product, Category, Order, OrderItem, Customer, CartItem, Cart
from datetime import datetime, timedelta

# Create a Faker instance
fake = Faker()

with app.app_context():
  

    # Create categories
    category1 = Category(name='Electronics')
    category2 = Category(name='Books')
    db.session.add(category1)
    db.session.add(category2)

    # Create products
    product1 = Product(name='iPhone', price=999.99, inventory=10, image_path='/path/to/image1.jpg', description='Latest iPhone', category=category1)
    product2 = Product(name='Harry Potter', price=19.99, inventory=20, image_path='/path/to/image2.jpg', description='Harry Potter series', category=category2)
    db.session.add(product1)
    db.session.add(product2)

    # Create customer
    customer = Customer(first_name='John', last_name='Doe', email='john.doe@example.com', address='123 Main St')
    db.session.add(customer)

    # Create order
    order = Order(order_date=datetime.now(), total_price=1019.98, customer=customer)
    db.session.add(order)

    # Create order items
    order_item1 = OrderItem(quantity=1, price=999.99, order=order, product=product1)
    order_item2 = OrderItem(quantity=1, price=19.99, order=order, product=product2)
    db.session.add(order_item1)
    db.session.add(order_item2)

    # Create event
    event = Event(image_path='/path/to/event.jpg', title='Big Sale', date=datetime.now() + timedelta(days=10), location='Online', price=0)
    db.session.add(event)

    # Create cart
    cart = Cart(total_price=0.0)
    db.session.add(cart)

    # Create cart items
    cart_item1 = CartItem(product_id=product1.id, quantity=1, price=999.99, cart_id=cart.id)
    cart_item2 = CartItem(product_id=product2.id, quantity=1, price=19.99, cart_id=cart.id)
    db.session.add(cart_item1)
    db.session.add(cart_item2)

    # Commit the transaction
    db.session.commit()

