import issuer from './issuer.json'
import billingInformations from './billingInformations.json'

export type Order = {
  orderNumber: string
  products: { name: string; description: string; price: number }[]
  customer: { customer_id: string; name: string; email: string }
}

type BillingInformations = { [k: string]: (typeof billingInformations)['admin@www.com'] }

type InvoiceNumber = string
type Invoice = {
  number: InvoiceNumber
  customerId: string
  created: string
  due: string
  issuer: { name: string; address: string; city: string }
  customer: { name: string; address: string; city: string; email: string }
  items: { name: string; amount: string }[]
  total: string
}
type InvoiceItems = Invoice['items']
type InvoiceCustomer = Invoice['customer']

const invoices: { [k: string]: Invoice } = {}

export function issueInvoice(order: Order): InvoiceNumber {
  const issue_number = order.orderNumber
  const { created, due } = getInvoiceDates()
  const sum = order.products.reduce((p, c) => p + c.price, 0)
  const total = toAmount(sum)
  const customerBillingInformations = (billingInformations as BillingInformations)[order.customer.customer_id]
  if (!customerBillingInformations) {
    throw new Error('missing billing informations')
  }
  const customer: InvoiceCustomer = {
    name: order.customer.name,
    email: order.customer.email,
    address: customerBillingInformations?.address,
    city: customerBillingInformations?.city
  }
  const items: InvoiceItems = order.products.map((p) => ({ name: p.name, amount: toAmount(p.price) }))
  const invoice: Invoice = {
    customerId: order.customer.customer_id,
    created,
    customer,
    due,
    issuer,
    items,
    number: issue_number,
    total
  }
  invoices[issue_number] = invoice
  return order.orderNumber
}

export function getInvoice(customerId: string, invoiceNumber: InvoiceNumber) {
  const invoice = invoices[invoiceNumber]
  if (!invoice || invoice.customerId !== customerId) {
    return
  }
  return invoice
}

const toAmount = (p: number) => `EUR ${p}`
const getInvoiceDates = () => {
  const now = new Date()
  const created = formatDate(now)

  const expired = now.setMonth(now.getMonth() + 1)
  const due = formatDate(new Date(expired))
  return { created, due }
}

const formatDate = (t: Date) => {
  const mf = new Intl.DateTimeFormat('en', { month: 'long' }).format
  const df = new Intl.DateTimeFormat('en', { day: 'numeric' }).format
  const yf = new Intl.DateTimeFormat('en', { year: 'numeric' }).format
  return `${mf(t)}, ${df(t)} ${yf(t)}`
}
