from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, SubmitField, DateTimeField)
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    id = IntegerField("review id")
    user_id = IntegerField("user id")
    item_id = IntegerField("item id")
    review = TextAreaField("review", validators=[DataRequired(), Length(min=1, max=50, message = "Review must be between 1-50 characters")])
    stars = IntegerField("stars", validators=[DataRequired()])
    created_at = DateTimeField("created at")
    submit = SubmitField("submit")
