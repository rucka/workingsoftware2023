#https://www.kickstarter.com/projects/invisibility-shield/invisibility-shield?ref=discovery_category
product = {'name': 'Invisibility Shield', 'price': 274.11, 'cover':'https://ksr-ugc.imgix.net/assets/036/322/010/ca40409669275917055ef729bce42996_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1644499030&gif-q=50&q=92&s=a43ad2539dcb7548e8ab41c6b991edaa', 'carousel':['https://ksr-ugc.imgix.net/assets/036/008/506/97451615b1f01b91a574b345371b19fe_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1641569467&gif-q=50&q=92&s=314599f5bf1569db8b69eba254243554','https://ksr-ugc.imgix.net/assets/036/022/298/9d1872a9fc85e91ac8852095ace60c64_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1641751470&gif-q=50&q=92&s=f1908cf1496c36e92c6bf5f20190bd07','https://ksr-ugc.imgix.net/assets/035/874/064/3351b6fddc14d10ecee364bdb2fbdf3e_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1639760963&gif-q=50&q=92&s=342b472e36123e31878c8674ea5218d9', 'https://ksr-ugc.imgix.net/assets/036/027/799/8211c8cdea5289b6b9e4a16e04867d3e_original.jpg?ixlib=rb-4.0.2&w=680&fit=max&v=1641814949&gif-q=50&q=92&s=d6c15710007bbdf7b2350e834760670b'], 'description': '''
A few years back, the internet was buzzing with chatter about independent makers working on turning science fiction into reality and creating fully functional invisibility shields. People were swapping designs, sharing ideas and some of us were even patching sketchy looking shields together in workshops and garages. Even though these initial creations didn't work so well and there were many barriers yet to overcome, it still seemed like one day, working invisibility shields could actually be possible. 

But by late 2020, progress had mostly stalled, too many roadblocks had been hit, hardly anyone seemed to be releasing new prototypes anymore and most people appeared to have lost interest in the idea altogether.
Disappointed by the lack of progress and the continued unavailability of actual working invisibility shields, we decided to step things up and go all in on our project to create one. We went through countless iterations, tested a lot of materials, and experienced a lot of failure. But along the way, we managed to develop a reliable, scalable and efficient manufacturing process and created what we believe are the best invisibility shields ever made.
'''}

def getProduct():
    r = dict(product)
    del r["price"]
    return r

def setProduct(name, description):
    product['name'] = name
    product["description"] = description

def getPrice():
    return product['price']

def setPrice(price):
    product['price'] = price