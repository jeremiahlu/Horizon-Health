from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, SubmitField, DateTimeField)
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    id = IntegerField("review id")
    user_id = IntegerField("user id")
    item_id = IntegerField("item id")
    review = TextAreaField("review", validators=[DataRequired()])
    stars = IntegerField("stars")
    created_at = DateTimeField("created at")
    submit = SubmitField("submit")
