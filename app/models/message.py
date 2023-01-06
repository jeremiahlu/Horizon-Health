from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Message(db.Model):
    '''
    Relationships:
        Message belongs to User
    '''
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime(timezone=True),
                          server_default = func.now())

    sender = db.relationship("User", foreign_keys=[sender_id], back_populates='recipient')
    recipient = db.relationship(
        "User", foreign_keys=[recipient_id], back_populates='sender')
   

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message': self.message,
            'timestamp': self.timestamp
        }