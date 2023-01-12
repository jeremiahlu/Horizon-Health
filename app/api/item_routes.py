from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Item, User, Review, db
from app.forms import ReviewForm
from datetime import datetime 

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_all_items():
  items = Item.query.all()
  return jsonify({'items': [item.to_dict() for item in items]})

@item_routes.route('/<int:item_id>')
def get_item(item_id):
  item = Item.query.get_or_404(item_id)
  return item.to_dict()

@item_routes.route('/<int:item_id>/reviews')
@login_required
def get_reviews(item_id):
    reviews = Review.query.filter(Review.item_id == item_id)
    return jsonify({'reviews': [review.to_dict() for review in reviews]})

@item_routes.route('/<int:item_id>/reviews/', methods = ['POST'])
@login_required
def post_new_review(item_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      new_review = Review(
        user_id = current_user.id,
        item_id = item_id,
        review = form.review.data,
        stars = form.stars.data
      )
      db.session.add(new_review)
      db.session.commit()
      review = new_review.to_dict()
      return review
    return "Bad Data"
