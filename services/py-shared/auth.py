import flask

from datetime import datetime, timedelta
from functools import wraps
from jose import jwt
import json
import base64

from secret import readSecret
ALGORITHM="HS256"
SECRET = readSecret()
HOUR = 1

def encode(payload, expiresInHours = 30 * 24):
    return jwt.encode({**payload, **{'exp' : datetime.utcnow() + timedelta(hours=expiresInHours)}}, SECRET, algorithm=ALGORITHM)

def sign(payload):
    token = encode(payload, 1 * HOUR)
    _, payloadBase64, signature = token.split(".")
    return {**extractPayload(payloadBase64), "__signature__": signature}

def extractPayload(payloadBase64):
    decodedPayload = base64url_decode(payloadBase64)
    return json.loads(decodedPayload)

def decode(token):
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])

def extractDataFromAccessToken():
    token = None
    if 'x-access-tokens' in flask.request.headers:
        token = flask.request.headers['x-access-tokens']

    if 'x-access-tokens' in flask.request.cookies:
        token = flask.request.cookies['x-access-tokens']
    
    if  token:
        try:
            return decode(token)
        except:
            return None
    return None

def isAuthenticated():
    return extractDataFromAccessToken() is not None    

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
        data = extractDataFromAccessToken()
        if data is None:
            return flask.make_response("ko", 401)
       
        return f(data, *args, **kwargs)
   return decorator

def base64url_decode(input):
    if isinstance(input, str):
        input = input.encode("ascii")

    rem = len(input) % 4

    if rem > 0:
        input += b"=" * (4 - rem)

    return base64.urlsafe_b64decode(input)