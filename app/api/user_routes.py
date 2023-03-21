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
    myCart = Cart.query.filter_by(user_id = id).all()
    myCartItems = CartItem.query.filter_by(cart_id = id).all()

    return jsonify({'orders' : [order.to_dict() for order in myOrders]})

@user_routes.route('/<int:id>/orders/<int:order_id>/')
@login_required
def get_single_order(id, order_id ):
    myOrders = Order.query.filter_by(user_id = id).all()
    order = myOrders.query.filter(Order.id == order_id).first()

    return order.to_dict();


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

@user_routes.route('/<int:id>/saved/', methods= ["POST"])
def add_to_favorites(id):
    saved = Save.query.filter(Save.user_id == id).first()
    # print(id,'id@!$$@$@$')
    form = FavoritesForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        marker_str = form.marker.data
        marker = marker_str.to_dict()
        print(marker, 'MARKER%*#%##!%!#%!')
        new_favorite = Save(
            user_id = id,
            name = marker.get('title', ''),
            address = marker.get('address', '')
          
          )
        db.session.add(new_favorite)
        db.session.commit()
        
        return new_favorite.to_dict()
    return "Bad Data"
# @user_routes.route('/<int:id>/saved/', methods= ["POST"])
# def add_to_favorites(id):
#     saved = Save.query.filter(Save.user_id == id).first()
#     # print(id,'id@!$$@$@$')
#     form = FavoritesForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         marker_str = form.marker.data
#         marker_dict = json.loads(marker_str)
#         print(marker_dict, 'HIT')
#         marker = json.loads(marker_dict['title'])
#         # print(type(marker), 'MARKER)@()!$!$!$')
#             #   position = marker.get('position')
#         new_favorite = Save(
#             user_id = id,
#             name = marker_dict.get('title', ''),
#             address = marker_dict.get('address', '')
#             #   latitude = position.get('lat', '')
#             #   longitude = position.get('lng', '')
#           )
#         db.session.add(new_favorite)
#         db.session.commit()
        
#         return new_favorite.to_dict()
#     return "Bad Data"