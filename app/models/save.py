from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func, PickleType

class Save(db.Model):

  __tablename__ = 'saves'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  # name = db.Column(db.String(255))
  # address = db.Column(db.String(255))
  # marker = db.Column(db.String, nullable = True )
  marker = db.Column(db.PickleType, nullable = True)
  # latitude = db.Column(db.Float)
  # longitude = db.Column(db.Float)

  user = db.relationship('User', primaryjoin = '(User.id == Save.user_id)', back_populates='saves')

  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'marker': self.marker
        # 'name': self.name,
        # 'address': self.address,
        # 'latitude': self.latitude,
        # 'longitude': self.longitude
    }
