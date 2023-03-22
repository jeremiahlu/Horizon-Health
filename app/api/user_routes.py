from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Cart, CartItem, Order, Save, db
from app.forms import FavoritesForm
import json

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/orders/')
@login_required
def get_users_orders(id):
    myOrders = Order.query.filter_by(user_id = id).all()
    # myCart = Cart.query.filter_by(user_id = id).all()
    myCartItems = CartItem.query.filter_by(cart_id = id).all()
    # print(myCartItems, ' c$*!&(*$!)))')
    orders_data = [order.to_dict() for order in myOrders]
    # for order in myOrders:
    #     order_data = order.to_dict()
    #     orders_data.append(order_data)

    return jsonify({'orders' : [order.to_dict() for order in myOrders], 'cart_items': [cart_item.to_dict() for cart_item in myCartItems]})

@user_routes.route('/<int:id>/orders/<int:order_id>/')
@login_required
def get_single_order(id, order_id ):
    # myOrders = Order.query.filter_by(user_id = id).all()
    # order = myOrders.query.filter(Order.id == order_id).first()
    # order = Order.query.get(order_id)
    # print(order.cart_item, 'HIT%!*(*(*(*(**(*())))))')

    # return jsonify({
    #         'id': order.id,
    #         'user_id': order.user_id,
    #         'total_price': order.total_price,
    #         'cart_items': [cart_item.to_dict() for cart_item in order.cart_item]
    #     })
    myCartItems = CartItem.query.filter_by(cart_id = id).all()
    # print(myCartItems[0], ' c$*!&(*$!)))')
    order = Order.query.filter_by(id=order_id, user_id=current_user.id).options(
    db.joinedload('cart_item')).first()
    print(order.to_dict(), "ORDER*)%&!)%!*)%*!(*!()%)")

    return order.to_dict()


@user_routes.route('/<int:id>/saved/')
@login_required
def get_users_saves(id):
    """
    Query for a user by id and returns that user in a dictionary
    """

    # mySaves = Save.query.filter(Save.user_id == id).all()
    # return jsonify({'saves': [save.to_dict() for save in mySaves]})
    
    # userId = current_user.id
    mySaves = Save.query.filter_by(user_id = id).all()
    print(mySaves, 'MYSAVES')
    return jsonify({'saves': [save.to_dict() for save in mySaves]})

@user_routes.route('/<int:id>/saved', methods= ["POST"])
def add_to_favorites(id):
    saved = Save.query.filter(Save.user_id == id).first()
    # print(id,'id@!$$@$@$')
    form = FavoritesForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # marker_str = form.marker.data
        # marker = marker_str.to_dict()
        # print(marker, 'MARKER%*#%##!%!#%!')
        new_favorite = Save(
            user_id = id,
            marker = form.marker.data
            # name = marker.get('title', ''),
            # address = marker.get('address', '')
          
          )
        db.session.add(new_favorite)
        db.session.commit()
        
        return new_favorite.to_dict()
    return "Bad Data"

@user_routes.route('/<int:id>/saved/<int:save_id>/', methods= ["DELETE"])
@login_required
def remove_from_favorites(id, save_id):
    saved = Save.query.filter(Save.user_id == id, Save.id == save_id).first()
    # print(saved, 'SDHAODHASO!*$*!$*$')
    # if (Save.user_id == current_user.id):
    #     db.session.delete(saved)
    #     db.session.commit()
    #     return f'Successfully deleted'
    # return 'Unauthorized'
    db.session.delete(saved)
    db.session.commit()
    # return f'Successfully deleted'
    return jsonify({"message": "Successfully deleted"})
