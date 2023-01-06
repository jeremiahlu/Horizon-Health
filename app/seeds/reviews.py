from app.models import db, Review, environment, SCHEMA


def seed_reviews():
  review1 = Review(
    user_id = 1,
    item_id = 1,
    review = "Great product at a great price!",
    stars = 4.5,
  )
  review2 = Review(
    user_id = 1,
    item_id = 3,
    review = "Great product at a great price!",
    stars = 4.5,
  )
  review3 = Review(
    user_id = 1,
    item_id = 7,
    review = "Just what I needed",
    stars = 5,
  )
  review4 = Review(
    user_id = 1,
    item_id = 5,
    review = "Worked like a charm!",
    stars = 5,
  )
  review5 = Review(
    user_id = 1,
    item_id = 10,
    review = "Decent product at this price",
    stars = 3.5,
  )
  review6 = Review(
    user_id = 1,
    item_id = 15,
    review = "Great product at a great price!",
    stars = 4,
  )
  review7 = Review(
    user_id = 2,
    item_id = 5,
    review = "Great product at a great price!",
    stars = 4.5,
  )
  review8 = Review(
    user_id = 2,
    item_id = 7,
    review = "Just what I needed",
    stars = 5,
  )
  review9 = Review(
    user_id = 3,
    item_id = 15,
    review = "I loved it!",
    stars = 5,
  )
  review10 = Review(
    user_id = 3,
    item_id = 9,
    review = "Decent product at this price",
    stars = 3.5,
  )
  review11 = Review(
    user_id = 2,
    item_id = 20,
    review = "Ok product but at a great price!",
    stars = 4,
  )

  db.session.add(review1)
  db.session.add(review2)
  db.session.add(review3)
  db.session.add(review4)
  db.session.add(review5)
  db.session.add(review6)
  db.session.add(review7)
  db.session.add(review8)
  db.session.add(review9)
  db.session.add(review10)
  db.session.add(review11)
  db.session.commit()

def undo_reviews():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM reviews")
      
  db.session.commit()