from datetime import datetime
from dateutil.relativedelta import relativedelta

from product import getPrice, getProduct
from user import getUserById
issuer = {'name': 'Cyberdyne Systems', 'address': '2144 Kramer St', 'city': 'Los Angeles, California' }

invoices = {}

def placeOrder(userId):
    price = getPrice()
    product = getProduct()
    user = getUserById(userId)
    customer = {'name': user['name'], 'address': user['address'], 'city': user['city'], 'email': userId }
    issue_number = "CS00" + str(len(invoices) + 1) + "-2022"
    order_number = issue_number
    created, due = getDates()
    total = "EUR " + str(price)
    items = [{'name' : product["name"], 'amount': "EUR " + str(price)}]
    invoice = {'number': issue_number, 'created': created, 'due': due, 'issuer': issuer, 'customer': customer, 'items': items, 'total': total}
    invoices[order_number] = invoice
    return order_number

def getInvoice(orderNumber):
    if orderNumber in invoices:
        return invoices[orderNumber]
    return None

def getDates():
    now = datetime.now()
    expired = now + relativedelta(months=1)

    created = now.strftime("%B, %d %Y")
    due = expired.strftime("%B, %d %Y")
    return created, due