from unicodedata import name
from flask import Flask, json, jsonify, request, make_response
from flask_cors import CORS
import logging
from credentials import getCredentialsById, getRole, credentials
from auth import SECRET, encode

app = Flask("identity service")
app.config['SECRET_KEY'] = SECRET
CORS(app, supports_credentials=True)

@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
 
    email = data["email"]
    password = data["password"]
    user = getCredentialsById(email)
    if email in credentials and password == user['password']:
        user_id = email
        role = getRole(user_id)
        token = encode({'user_id' : user_id, 'user_role': role})
        print ('user', user_id, "->", token)
        userPayload = dict({"id":user_id, "role": role})
        response = make_response(jsonify({"result":"ok", "value": userPayload}), 200)
        response.set_cookie('x-access-tokens', token)
        return response
    else:
        return make_response("ko", 401)

@app.route('/logout')
def logout():
    response = make_response("ok", 200)
    response.delete_cookie('username')
    return 'ok'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002, debug=True)
    app.logger.setLevel(logging.DEBUG)
