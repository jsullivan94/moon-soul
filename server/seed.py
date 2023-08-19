from faker import Faker
from config import db, app
from models import Admin, Event, Product, Category, Order, OrderItem, Customer, CartItem, Cart
from datetime import datetime, timedelta

# Create a Faker instance
fake = Faker()

with app.app_context():
     # Delete all categories
    Category.query.delete()
    
    # Delete all products
    Product.query.delete()
    
    # Delete all events
    Event.query.delete()
    # Create categories
    category1 = Category(name='Cloths')
    category2 = Category(name='Vinyl')
    db.session.add(category1)
    db.session.add(category2)

    # Create products
    product1 = Product(name='Vinyl', price=35.00, inventory=10, image_path='/pictures/Moon_Soul.jpeg', description='Our latest record printed to vinyl!', category=category2)
    product2 = Product(name='MS T-Shirt', price=20.00, inventory=20, image_path='https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg', description='Moon Soul swag', category=category1)
    product3 = Product(name='MS Longsleve', price=20.00, inventory=20, image_path='https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg', description='Moon Soul swag', category=category1)
    product4 = Product(name='MS Hoodie', price=20.00, inventory=20, image_path='https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg', description='Moon Soul swag', category=category1)
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)

    event = Event(image_path='https://i.ytimg.com/vi/nfvaPGOyKzs/sddefault.jpg', title='Uptown Night Market', date='10/12/23-4:30PM', location=' 701 W 133rd St, New York, NY 10027')
    event2 = Event(image_path='https://media.timeout.com/images/105502877/image.jpg', title='Queens Night Market', date='10/07/23-4:30PM', location='4701 111th St, Queens, NY 11368')
    event3 = Event(image_path='https://lh3.googleusercontent.com/p/AF1QipOtg-zA-RXe_FSWsvsJKkJPrG9sEPrMman5B-E=s680-w680-h510', title='Brooklyn Music Kitchen', date='7/21/23-7:00PM', location='177 Vanderbilt Ave, Brooklyn, NY 11205', price=11)
    event4 = Event(image_path='https://lh3.googleusercontent.com/p/AF1QipML__r2ZGDc9iAx5ML1ovDnj0KMhuKRGocynTLy=s680-w680-h510', title='The Porch', date='7/14/23-9:00PM', location='750A St Nicholas Ave, New York, NY 10031')
    event5 = Event(image_path='https://greenwichvillage.nyc/wp-content/uploads/2021/06/groove.jpg', title='Groove', date='06/23/23-7:00PM', location='125 MacDougal St, New York, NY 10012')
    event6 = Event(image_path='https://rockwoodmusichall.com/wp-content/uploads/2020/01/Rockwood-Approved-1_3000x2000.jpg', title='Rockwood Music Hall, Stage 2', date='06/16/23-10:00PM', location='196 Allen St, New York, NY 10002', price=10)
    db.session.add(event)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.add(event5)
    db.session.add(event6)
   
    db.session.commit()

