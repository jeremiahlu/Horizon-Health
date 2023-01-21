from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, SubmitField, DateTimeField)
from wtforms.validators import DataRequired, ValidationError
from app.models import Cart

# def cart(form, field):
#     # Checking if cart exists
#     user_id = User.query.
#     cart = Cart.query.filter(Cart.user_id == user_id).first()
#     if cart:
#         raise ValidationError('Email address is already in use.')

class CartForm(FlaskForm):
    # id = IntegerField("review id")
    user_id = IntegerField("user id")
    
    # created_at = DateTimeField("created at")
    # submit = SubmitField("submit")
