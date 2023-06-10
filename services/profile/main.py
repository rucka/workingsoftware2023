from flask import Flask, jsonify, make_response
from flask_cors import CORS
import logging
from auth import token_required, SECRET, sign
from user import getUserById

app = Flask("profile service")
app.config['SECRET_KEY'] = SECRET
CORS(app, supports_credentials=True)

@app.route('/me')
@token_required
def me(user_credentials):
    user = getUserById(user_credentials["user_id"])
    signed_user = sign(user)
    user_json = jsonify(signed_user)
    return make_response(user_json, 200)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003, debug=True)
    app.logger.setLevel(logging.DEBUG)
