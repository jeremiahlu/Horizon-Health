from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, SubmitField, DateTimeField)
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    # id = IntegerField("review id")
    cart_id = IntegerField("cart id")
    item_id = IntegerField("item id")
    quantity = IntegerField("quantity")
    # created_at = DateTimeField("created at")
    # submit = SubmitField("submit")
