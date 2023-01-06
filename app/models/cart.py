from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Cart(db.Model):

  __tablename__ = 'carts'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  checked_out = db.Column(db.Boolean, nullable = False, default = False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  users = db.relationship('User', primaryjoin = '(User.id == Cart.user_id)', back_populates='cart')
  cart = db.relationship("CartItem", primaryjoin = '(Cart.id == CartItem.cart_id)', back_populates="users_cart", cascade = 'all, delete-orphan')


  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'checked_out': self.checked_out,
        'created_at': self.created_at,
    }
