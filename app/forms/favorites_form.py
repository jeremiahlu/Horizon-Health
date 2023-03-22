from flask_wtf import FlaskForm
from wtforms import (TextAreaField, StringField, IntegerField, SubmitField, DateTimeField)
from wtforms.validators import DataRequired, ValidationError
from app.models import Save


class FavoritesForm(FlaskForm):
    user_id = IntegerField("user id")
    marker = StringField('marker')
    # name = StringField('name')
    # address = StringField('address')
