from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=3, max=30, message = "Username must be between 3-30 characters"), username_exists])
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=3, max=30, message = "Username must be between 3-30 characters")])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=3, max=30, message = "Username must be between 3-30 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists])
    address = StringField('address', validators=[DataRequired()])
    gender = StringField('gender', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max = 15, message = "Password must be between 6-15 characters long")])
    profile_picture = StringField('profile_picture', validators=[DataRequired()])