from app.models import db, Cart, environment, SCHEMA

def seed_carts():
  cart1 = Cart(
    user_id = 1,
    checked_out = False
  )
  cart2 = Cart(
    user_id = 2,
    checked_out = False
  )
  cart3 = Cart(
    user_id = 3,
    checked_out = False
  )

  db.session.add(cart1)
  db.session.add(cart2)
  db.session.add(cart3)
  db.session.commit()

def undo_carts():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM carts")
      
  db.session.commit()