users={'MerlinBDeweese@teleworm.us': {'name': 'Merlin B. Deweese'}, 'admin@www.com': {'name': 'Kirby K. Bishop'}, 'content@www.com': {'name': 'Lucia A. Brooks'}, 'price@www.com': {'name': 'Rose M. Skidmore'}}

def getUserById(userid):
    user = dict(users[userid])
    return {**{"id": userid}, **user }