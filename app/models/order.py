from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

# order_items = db.Table('order_items',
#     db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
#     db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True),
#     db.ForeignKeyConstraint(['order_id'], ['orders.id']),
#     db.ForeignKeyConstraint(['item_id'], ['items.id'])
# )

class Order(db.Model):

  __tablename__ = 'orders'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  total_price = db.Column(db.Integer)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  users = db.relationship('User', primaryjoin = '(User.id == Order.user_id)', back_populates='orders')

  cart_item = db.relationship('CartItem', back_populates='order', lazy=True)

  # item = db.relationship('Item', secondary=order_items, back_populates = 'item_cart')
 

  def to_dict(self):
    items = [el.cart_items.to_dict() for el in self.cart_item]
    print(self.cart_item, 'CARTITEM%*!))!#%*!#%*#!%!')
    # items = self.cart_item.cart_items
    # items = [item['item'] for item in cart_items]
    return {
        'id': self.id,
        'user_id': self.user_id,
        'total_price': self.total_price,
        'created_at': self.created_at,
        # 'items': self.cart_item.cart_items,
        'items': items
        # 'cart_items': [item.to_dict() for item in self.cart_item],
        # 'items': [item.to_dict() for item in self.item]
    }
