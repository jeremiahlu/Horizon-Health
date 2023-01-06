from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:review_id>')
@login_required
def get_review(review_id):
  review = Review.query.get_or_404(review_id)
  return review.to_dict()

@review_routes.route('/<int:review_id>', methods = ['DELETE'])
@login_required
def delete_review(review_id):
  review = Review.query.get_or_404(review_id)
  if (review.user_id == current_user.id):
    db.session.delete(review)
    db.session.commit()
    return f'Review successfully deleted'
  return 'Unauthorized'

@review_routes.route('/<int:review_id>', methods = ['PUT'])
@login_required
def edit_review(review_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review = Review.query.get_or_404(review_id)
    if review.user_id == current_user.id:
      review.review = form.review.data
      review.stars = form.stars.data
      db.session.commit()
      return review.to_dict()
    return "Unauthorized"
  return "Bad Data"
