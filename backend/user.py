import flask_login
from server import app

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users={'MerlinBDeweese@teleworm.us': {'password': 'secret', 'role':'customer', 'name': 'Merlin B. Deweese', 'address':'635 Mount Tabor','city':'White Plains, NY 10601'}, 'admin@www.com': {'password': 'secret','role':'admin', 'name': 'Kirby K. Bishop', 'address':'2067 Hampton Meadows','city':'Cambridge, MA 02141'}, 'content@www.com': {'password': 'secret','role':'content', 'name': 'Lucia A. Brooks', 'address':'814 Jewell Road','city':'Minneapolis, MN 55402'}, 'price@www.com': {'password': 'secret','role':'price', 'name': 'Rose M. Skidmore', 'address':'930 Ventura Drive','city':'Salinas, CA 93901'}}
class User(flask_login.UserMixin):
    pass

@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email
    return user

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized', 401

def getUserById(userid):
    user = dict(users[userid])
    del user["password"]
    user["id"] = userid
    return user

def getUserRoleById(userid):
    user = dict(users[userid])
    return user['role']