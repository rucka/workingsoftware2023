from flask import Flask
import secrets
from flask_cors import CORS

secret_key = secrets.token_hex(16)

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key
CORS(app, supports_credentials=True)
