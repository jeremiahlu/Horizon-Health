from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Item, CartItem, db
from app.forms import CartItemForm
from datetime import datetime 

cart_routes = Blueprint('cart', __name__)

# @cart_routes.route('/')
# def get_all_items():
#   carts = CartItem.query.all()
#   # print (carts,'*************************')
#   return jsonify({'carts': [cart.to_dict() for cart in carts]})
@cart_routes.route('/<int:cart_id>/items/')
def get_all_cartItems(cart_id):
  userId = current_user.id
  myCart = CartItem.query.filter_by(cart_id = userId).all()
  
  # print (myCart,'*************************') 
  return jsonify({'cart_items': [cart_item.to_dict() for cart_item in myCart]})

@cart_routes.route('/<int:cart_id>/items/<int:item_id>', methods= ["POST"])
def add_cart_item(cart_id, item_id):
    # carts = Cart.query.get(cart_id)

    carts = CartItem.query.filter(CartItem.cart_id == cart_id).first()
    item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()
    # print (item, "%#$#!$QW")

    form = CartItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if (item): 
          # cart_id = form.cart_id.data,
          # item_id = form.item_id.data,
          item.quantity += 1
          db.session.commit()
          return item.to_dict()
        else: 
          new_cartItem = CartItem(
              cart_id = form.cart_id.data,
              item_id = form.item_id.data,
              quantity = 1
          )
        db.session.add(new_cartItem)
        db.session.commit()
        # print (new_cartItem.to_dict(), 'ADISAWAD******')
        return new_cartItem.to_dict()
    return "Bad Data"

@cart_routes.route('/<int:cart_id>/items/<int:item_id>/', methods = ['DELETE'])
def remove_cart_item(cart_id, item_id):
  # cart = Cart.query.get(cart_id)
  # item = CartItem.query.filter(CartItem.item_id == item_id).first()
  # cart = Cart.query.filter(Cart.id == cart_id).first()
  # item = Item.query.filter(Item.id == item_id).first()

  item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()
  # cart_item = CartItem.query.filter(CartItem.cart_id == cart.id, CartItem.item_id == item.id).first()

  # print (cart, '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')
  # print (item, '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')
  # print (cart_item, '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')

  item.quantity -= 1
  # if (item):
  if (item.quantity == 0):
    db.session.delete(item)
    db.session.commit()
    return f'Successfully deleted {item}'
  db.session.commit()
  return item.to_dict()