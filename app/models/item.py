from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Item(db.Model):

    __tablename__='items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer, nullable = False, default = 1)
    name = db.Column(db.Text(), nullable = False)
    description = db.Column(db.Text())
    price = db.Column(db.Integer, nullable = False)
    image = db.Column(db.String)
    created_at =  db.Column(db.DateTime(timezone=True), server_default=func.now())

    # itemized_cart = db.relationship('CartItem', back_populates = 'cart_items', cascade = 'all, delete-orphan')
    itemized_cart = db.relationship('CartItem', primaryjoin = '(Item.id == CartItem.item_id)', back_populates = 'cart_items')
    item_review = db.relationship('Review', back_populates = 'item', cascade = 'all, delete-orphan')
    # item_cart = db.relationship('Order', back_populates = 'item')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image': self.image,
            'created_at': self.created_at
        }
