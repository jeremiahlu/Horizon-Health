from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Item, CartItem, db
from app.forms import CartItemForm, CartForm
from datetime import datetime 

cart_routes = Blueprint('cart', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@cart_routes.route('/<int:cart_id>/items/')
def get_all_cartItems(cart_id):
  userId = current_user.id
  myCart = CartItem.query.filter_by(cart_id = userId).all()
  
  # print (myCart,'*************************') 
  return jsonify({'cart_items': [cart_item.to_dict() for cart_item in myCart]})
