from faker import Faker
from config import db, app
from models import Admin, Event, Product, Category, Order, OrderItem, Customer

# Create a Faker instance
fake = Faker()

with app.app_context():
    # Clear all tables
    db.session.query(Admin).delete()
    db.session.query(Event).delete()
    db.session.query(Product).delete()
    db.session.query(Category).delete()
    db.session.query(Order).delete()
    db.session.query(OrderItem).delete()
    db.session.query(Customer).delete()

    # Create and add fake Admin
    admin = Admin(
        username=fake.unique.user_name()
    )
    admin.password_hash = fake.password(length=10)
    db.session.add(admin)

    # Create and add fake Events
    for _ in range(10):
        event = Event(
            image_path=fake.image_url(),
            title=fake.catch_phrase(),
            date=fake.date_time_this_year(),
            location=fake.address(),
            price=fake.random_int(min=0, max=1000)
        )
        db.session.add(event)

    # Create and add fake Categories
    categories = []
    for _ in range(5):
        category = Category(
            name=fake.unique.word()
        )
        categories.append(category)
        db.session.add(category)

    # Create and add fake Products
    products = []
    for _ in range(20):
        product = Product(
            name=fake.unique.word(),
            price=fake.random_number(digits=2),
            inventory=fake.random_int(min=0, max=100),
            image_path=fake.image_url(),
            description=fake.sentence(),
            category_id=fake.random_element(elements=[category.id for category in categories])
        )
        products.append(product)
        db.session.add(product)

    # Create and add fake Customers
    customers = []
    for _ in range(10):
        customer = Customer(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            address=fake.address()
        )
        customers.append(customer)
        db.session.add(customer)

    db.session.commit()

    # Create and add fake Orders and OrderItems
    for customer in customers:
        order = Order(
            total_price=fake.random_number(digits=2),
            customer_id=customer.id
        )
        db.session.add(order)
        db.session.flush()  # to make sure order has id

        for _ in range(fake.random_int(min=1, max=5)):  # each order has 1-5 items
            order_item = OrderItem(
                quantity=fake.random_int(min=1, max=5),
                quantity_price=fake.random_number(digits=2),
                order_id=order.id,
                product_id=fake.random_element(elements=[product.id for product in products])
            )
            db.session.add(order_item)

    # Commit the changes
    db.session.commit()
