from config import db, app
from models import Admin, Event, Product, Category, Size, Inventory, IGToken
import random
import os

ig_access_token = os.environ.get('IG_ACCESS_TOKEN')

with app.app_context():
    Category.query.delete()
    Product.query.delete()
    Event.query.delete()
    Admin.query.delete()
    Size.query.delete()
    Inventory.query.delete()

    db.session.commit()

    access_token = IGToken(token=ig_access_token)
    db.session.add(access_token)
    db.session.commit()

    category1 = Category(name='Cloths')
    category2 = Category(name='Vinyl')
    db.session.add(category1)
    db.session.add(category2)
    db.session.commit() 

    product1 = Product(name='Vinyl', price=35.00, image_path='/photos/albumcover.png', description='Our latest record printed to vinyl!', category=category2)
    product2 = Product(name='MS T-Shirt', price=20.00, image_path='/photos/WIERDO-TEE.jpg', description='Moon Soul swag', category=category1)
    
    db.session.add(product1)
    db.session.add(product2)
    db.session.commit()


    sizes = ['Small', 'Medium', 'Large', 'XL', 'XXL']
    size_objects = []

    for size_name in sizes:
        size = Size(name=size_name, description=f"Unisex {size_name} size")
        db.session.add(size)
        size_objects.append(size)
    db.session.commit()

    products = [product1, product2] 
    
    for product in products:            
        if product.category_id == 2:
            quantity = random.choice([5, 10, 15, 20])
            inventory = Inventory(product_id=product.id, quantity=quantity)
            db.session.add(inventory)

    for product in products:
        for size in size_objects:
            if product.category_id == 1: 
                quantity = random.choice([0, 5, 10, 15, 20])
                inventory = Inventory(product_id=product.id, size_id=size.id, quantity=quantity)
                db.session.add(inventory)


    try:
        db.session.commit()
        print("Sizes and inventory added successfully.")
    except Exception as e:
        print(f"Error adding sizes and inventory: {e}")
        db.session.rollback()


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

