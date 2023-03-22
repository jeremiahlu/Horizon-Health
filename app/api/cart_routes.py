from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Item, CartItem, Order, db
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
  # cart_items = [cart_item.to_dict() for cart_item in myCart.cart]
  # cart_info = myCart.to_dict()
  
  # response = {'cart_items': cart_items, 'cart_info': cart_info}
  # return jsonify(response)

@cart_routes.route('/<int:id>')
def get_my_cart(id):
    userId = current_user.id
    myCart = Cart.query.filter_by(id=userId).first()
    return jsonify({'my_cart': myCart.to_dict()})

# @cart_routes.route('/<int:id>')
# def get_my_cart(id):
#   userId = current_user.id
#   myCart = Cart.query.filter_by(id = userId).first()
#   return jsonify({'my_cart': [cart.to_dict() for cart in myCart]})

# @cart_routes.route('/', methods =['POST'])
# def create_cart():
#   user_id = current_user.id
#   cart_exist = Cart.query.filter_by(id = user_id)

#   form = CartForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if cart_exist:
#     return {"error": ["You already have a cart"]}, 403
#   else:
#     if form.validate_on_submit():
#       cart = Cart(
#         user_id = current_user.id
#       )
#       db.session.add(cart)
#       db.session.commit()
#       return cart.to_dict()
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@cart_routes.route('/', methods = ['POST'])
def new_cart():
  user_id = current_user.id 
  cart = Cart(
    user_id = user_id 
  )
  db.session.add(cart)
  db.session.commit()
  return cart.to_dict()

@cart_routes.route('/<int:cart_id>/items', methods =['DELETE'])
def clear_cart(cart_id):
  user_id = current_user.id
  cart_exist =  CartItem.query.filter_by(cart_id = user_id).all()

  userId = current_user.id
  myCart = CartItem.query.filter_by(cart_id = userId).all()
  # print(userId, "USERID@!!!!!!!!!!")
  print(myCart, "MYCART@!!!!!!!!!!")
  
  total_price = 0
  for cart_item in myCart:
    
    total_price += cart_item.quantity * cart_item.cart_items.price

  order = Order(user_id = userId, total_price = total_price)
  db.session.add(order)
  db.session.commit()

  # print(order.cart_item, 'HITTETE&)!&!!!!!!!!)%%!%!')
  # print(myCart, 'mYCARTT!!!!!!!!!!!!!!!&)!&!)%%!%!')

  for cart_item in myCart:
    #  print(cart_item.to_dict(), 'CART_ITEM%!%!%!%!%!%!%!%')
     cart_item.order_id = order.id
    #  order.items.append(cart_item)
    #  print(cart_item, "CARTITEMITEMS%!%$!@@!$@!")
     order.cart_item.append(cart_item)
     db.session.commit()
  # print(order.to_dict(), 'ORDERID!!!!!!!!!!')
  print(order.cart_item, '2222HITTETE&)!&!!!!!!!!)%%!%!')

  for item in range(len(cart_exist)):
    db.session.delete(cart_exist[item])
  db.session.commit()

  # db.session.delete(cart_exist)
  # db.session.commit()
  return jsonify({'message': 'Successfully deleted' }), 200

@cart_routes.route('/<int:cart_id>/items/<int:item_id>', methods= ["POST"])
def add_cart_item(cart_id, item_id):
    # carts = Cart.query.get(cart_id)
  carts = CartItem.query.filter(CartItem.cart_id == cart_id).first()
  item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()
  userId = current_user.id
  myCart = CartItem.query.filter_by(cart_id = userId).all()
  
  # total_price = 0
  # order = Order(user_id = userId, total_price = total_price)
     
  # print(myCart, 'MYCART')
  # for cart_item in myCart:
    
  #   total_price += cart_item.quantity * cart_item.cart_items.price
    # print (item, "%#$#!$QW")

    # carts = CartItem.query.filter(CartItem.cart_id == cart_id).first()
    # item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()
    # print (item, "%#$#!$QW")

  # db.session.add(order)
  # db.session.commit()
    
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
            quantity = 1,
            # order_id = order.id
        )
      db.session.add(new_cartItem)
      db.session.commit()
      # print (new_cartItem.to_dict(), 'ADISAWAD******')
      return new_cartItem.to_dict()
  return "Bad Data"

@cart_routes.route('/<int:cart_id>/items/checkout', methods=['POST'])
def checkout(cart_id): 

  userId = current_user.id
  myCart = CartItem.query.filter_by(cart_id = userId).all()
  print(userId, "USERID@!!!!!!!!!!")
  print(myCart, "MYCART@!!!!!!!!!!")
  
  total_price = 0
  for cart_item in myCart:
    
    total_price += cart_item.quantity * cart_item.cart_items.price

  order = Order(user_id = userId, total_price = total_price)
  db.session.add(order)
  db.session.commit()
  # print(order.__dict__, '*******************%&%&&%&%&%&%&&%&%')  
  for cart_item in myCart:
     cart_item.order_id = order.id
     order.cart_item.append(cart_item)

  return 'Order successfully placed'


@cart_routes.route('/<int:cart_id>/items/<int:item_id>/', methods = ['DELETE'])
def remove_cart_item(cart_id, item_id):
  # cart = Cart.query.get(cart_id)
  # item = CartItem.query.filter(CartItem.item_id == item_id).first()
  # cart = Cart.query.filter(Cart.id == cart_id).first()
  # item = Item.query.filter(Item.id == item_id).first()
  # print ("remove item at 0***************414213421**")
  item = CartItem.query.filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()
  # print ("remove item at 0********ewrraerwrerwq********")
  # cart_item = CartItem.query.filter(CartItem.cart_id == cart.id, CartItem.item_id == item.id).first()

  # print (item.quantity, '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')
  # print (item.to_dict(), '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')
  # print (cart_item, '41321%#$#$#!$@$@!@$@!$@!$@!$@!!@')

  item.quantity -= 1
  # if (item):
  if (item.quantity == 0):
    # print (item.quantity, '%#$#$#!$@$@!@$@!$@!$@!$@!!@')
    db.session.delete(item)
    # print (item, 'ITEM!!!!!!%#$#$#!$@$@!@$@!$@!$@!$@!!@')
    db.session.commit()
    # print (item, 'COMMIT%#$#$#!$@$@!@$@!$@!$@!$@!!@')
    # return {}
    return jsonify({'message': 'Successfully deleted'})
    # return "Successfully deleted"
  else:
    # print (item.quantity, '%#$#$#!$@$@!@$@!$@!$@!$@!!@')
    db.session.commit()
    # return item.to_dict()
    return {}