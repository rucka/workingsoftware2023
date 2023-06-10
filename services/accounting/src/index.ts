import restify from 'restify'
import {
  authenticate,
  authorizeService,
  validatePayloadSignature,
  parseServiceToken,
  plugins,
  preflight
} from '@workingsoftware2023/ts-shared/src/http'
import { getInvoice, issueInvoice, Order } from './invoice'

const server = restify.createServer({ name: 'accounting service' })

server.pre(preflight)
server.use(...plugins(server), parseServiceToken)

server.get('/invoice/:order_number', authenticate, (req, res, _) => {
  const order_number: string | undefined = req.params.order_number
  if (!order_number) {
    return res.send(404)
  }

  const invoice = getInvoice(req.user?.user_id ?? '', order_number)
  if (!invoice) {
    return res.send(404)
  }
  return res.json(invoice)
})

server.post('/invoice', parseServiceToken, authorizeService('oms'), validatePayloadSignature, (req, res, _) => {
  const params: { order: Order } | undefined = req.params
  if (!params || !params.order) {
    return res.send(404)
  }
  const invoiceNumber = issueInvoice(params.order)
  return res.json({ result: 'ok', value: invoiceNumber })
})

server.listen(3007, function () {
  console.log('%s listening at %s', server.name, server.url)
})
