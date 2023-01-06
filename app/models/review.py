from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Review(db.Model):

  __tablename__ = 'reviews'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
  review = db.Column(db.Text)
  stars = db.Column(db.Integer)
  created_at = db.Column(db.DateTime(timezone=True),
                          server_default = func.now())


  user = db.relationship('User', back_populates = 'reviews')
  item = db.relationship('Item', back_populates = 'item_review')


  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'item_id': self.item_id,
        'review': self.review,
        'stars': self.stars,
        'created_at': self.created_at
    }
