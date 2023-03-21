from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    '''
        Relationships:
            User has many Messages, Reviews
            User has one Cart
    '''

    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.Enum("Male", "Female", "Non-Binary", "Prefer not to say", name='gender_types'), nullable = False, default = "Prefer not to say")
    profile_picture = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', primaryjoin = '(User.id == Review.user_id)', back_populates = 'user', cascade = 'all, delete-orphan')
    sender = db.relationship('Message', foreign_keys = 'Message.recipient_id', back_populates = 'recipient', cascade = 'all, delete-orphan')
    recipient = db.relationship('Message', foreign_keys = 'Message.sender_id', back_populates = 'sender', cascade = 'all, delete-orphan')
    cart = db.relationship('Cart', foreign_keys = 'Cart.user_id', back_populates = 'users', cascade = 'all, delete-orphan')
    
    saves = db.relationship('Save', foreign_keys = 'Save.user_id', back_populates = 'user')
    orders = db.relationship('Order', back_populates ='users', lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'address': self.address,
            'gender': self.gender,
            'profile_picture': self.profile_picture
        }
