from faker import Faker
import random

# import your models here
from models import Event, Product, Category, Order, OrderItem, Customer
from config import db, app

fake = Faker()
with app.app_context():
    # seed categories
    categories = ['Vinyl', 'Clothing']
    for category_name in categories:
        category = Category(name=category_name)
        db.session.add(category)
    db.session.commit()

    # seed products
    for _ in range(10):
        product = Product(
            name=fake.word(),
            price=random.uniform(10.0, 100.0),
            inventory=random.randint(1, 100),
            image_path=fake.image_url(),
            description=fake.text(),
            category_id=random.choice([c.id for c in Category.query.all()])
        )
        db.session.add(product)
    db.session.commit()

    # seed events
    for _ in range(10):
        event = Event(
            image_path=fake.image_url(),
            title=fake.catch_phrase(),
            date=fake.future_date(end_date="+1y"),
            location=fake.city(),
            price=random.randint(0, 100)
        )
        db.session.add(event)
    db.session.commit()

    # seed customers
    for _ in range(10):
        customer = Customer(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            address=fake.address()
        )
        db.session.add(customer)
    db.session.commit()

    # seed orders
    for _ in range(10):
        customer_id=random.choice([c.id for c in Customer.query.all()])
        order = Order(
            total_price=0,  # initial value, to be updated when OrderItems are added
            customer_id=customer_id
        )
        db.session.add(order)
        db.session.commit()  # commit here to generate an order id

        # seed order items for this order
        for _ in range(random.randint(1, 3)):  # each order has 1-3 items
            product_id=random.choice([p.id for p in Product.query.all()])
            product_price=Product.query.filter(Product.id==product_id).one().price
            quantity=random.randint(1, 3)  # each item has a quantity of 1-3
            order_item = OrderItem(
                quantity=quantity,
                price=product_price,
                order_id=order.id,
                product_id=product_id
            )
            db.session.add(order_item)
            order.total_price += product_price * quantity  # update the order's total price

    db.session.commit()

