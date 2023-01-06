from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        address='363 Country Club Ave, Ridgecrest, CA 93555',
        password='password',
        gender='Male',
        profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg')
    marnie = User(
        username='marnie', 
        first_name='Marnie',
        last_name='Reagan',
        email='marnie@aa.io',
        address='7509 East Beach Lane Upper Marlboro, MD 20772',
        password='password',
        gender='Female',
        profile_picture='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7Vz_UavQ_-vlKel-h3ZKtlQ8YL-XuO6KvQ&usqp=CAU')
    bobbie = User(
        username='bobbie', 
        first_name='Bobbie',
        last_name='Mark',
        email='bobbie@aa.io', 
        address='31 Ridge Lane Union City, NJ 07087',
        password='password',
        gender='Non-Binary',
        profile_picture='https://images.squarespace-cdn.com/content/v1/51773f51e4b054c7ac3739b7/1503028288672-7P8K6PA1AYX9NX1ELXS0/Ian%2BSomerhalder-264_Web_Web_2.jpg?format=1500w')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()