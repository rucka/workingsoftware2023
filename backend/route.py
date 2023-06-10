from crypt import methods
import flask
import flask_login
from requests import request
from checkout import getInvoice, placeOrder
from server import app
from user import getUserById, getUserRoleById, users, User
from product import getProduct, getPrice, setPrice, setProduct

@app.route('/login', methods=['POST'])
def login():
    data = flask.json.loads(flask.request.data)
 
    email = data["email"]
    password = data["password"]
 
    if email in users and password == users[email]['password']:
        user = User()
        user.id = email
        flask_login.login_user(user)
        return flask.make_response("ok", 200)
    else:
        return flask.make_response("ko", 401)

@app.route('/me')
@flask_login.login_required
def me():
    user = getCurrentUser()
    user_json = flask.jsonify(user)
    return flask.make_response(user_json, 200)


@app.route('/price', methods=['GET','POST'])
@flask_login.login_required
def price():
    if flask.request.method == 'POST':
        if not isInRole(['admin', 'price']):
            return flask.make_response(403)
        
        price = flask.request.get_json()
        if not isinstance(price, (int, float)):
            return flask.make_response("expected price as number", 422)
        setPrice(price)
        return flask.make_response(flask.jsonify({"result":"ok", "value":getPrice()}), 200)

    if flask.request.method == 'GET':
        return str(getPrice())

@app.route('/product', methods=['GET','POST'])
def product():
    if flask.request.method == 'POST':
        if not isInRole(['admin', 'content']):
            return flask.make_response(403)
        
        if not flask_login.current_user.is_authenticated:
            return flask.make_response("not authenticated", 401)

        product = flask.request.get_json()
        if not isinstance(product, (dict)):
            return flask.make_response("expected product as object with name and description", 422)

        if 'name' not in product.keys():
            return flask.make_response("expected product with name", 422)
 
        if 'description' not in product.keys():
            return flask.make_response("expected product with description", 422)

        setProduct(product["name"], product["description"])
        return flask.make_response(flask.jsonify({"result":"ok", "value":getProduct()}), 200)

    if flask.request.method == 'GET':
        return getProduct()

@app.route('/checkout', methods=['POST'])
@flask_login.login_required
def checkout():
    orderNumber = placeOrder(flask_login.current_user.get_id())  
    return flask.make_response(flask.jsonify({"result":"ok", "value":orderNumber}), 200)

@app.route('/invoice/<order_number>')
@flask_login.login_required
def invoice(order_number):
    invoice = getInvoice(order_number)
    if invoice is None:
        return flask.make_response("invoice not found", 404)

    return flask.make_response(flask.jsonify({"result":"ok", "value":invoice}), 200)

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'ok'

def getCurrentUser():
    return getUserById(flask_login.current_user.get_id())

def isInRole(roles):
    role = getUserRoleById(flask_login.current_user.get_id()) 
    return role in roles