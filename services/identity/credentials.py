credentials={'MerlinBDeweese@teleworm.us': {'password': 'secret', 'role':'customer'}, 'admin@www.com': {'password': 'secret','role':'admin'}, 'content@www.com': {'password': 'secret','role':'content'}, 'price@www.com': {'password': 'secret','role':'price'}}

def getCredentialsById(userid):
    user = dict(credentials[userid])
    user["id"] = userid
    return user

def getRole(userid):
    return credentials[userid]['role']