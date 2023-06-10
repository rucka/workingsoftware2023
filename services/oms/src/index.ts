import restify from 'restify'
import { authenticate, validatePayloadSignature, plugins, preflight } from '@workingsoftware2023/ts-shared/src/http'
import { placeOrder, processOrder } from './checkout'
import { parseUserToken } from '@workingsoftware2023/ts-shared/src/http/parseUserToken'

const server = restify.createServer({ name: 'order management system' })

server.pre(preflight)
server.use(...plugins(server))

type CheckoutParams = {
  price: { price: number }
  profile: { name: string; id: string }
  product: { name: string; description: string }
}

server.post('/checkout', parseUserToken, authenticate, validatePayloadSignature, async (req, res, _) => {
  if (!req.params) {
    return res.send(422, 'parameters not provided')
  }
  const params: CheckoutParams = req.params

  const orderResponse = placeOrder(params.price.price, params.profile, params.product)
  if (orderResponse.result === 'ko') {
    return res.send(500, orderResponse.message)
  }
  const order = orderResponse.value
  try {
    const processResponse = await processOrder(order)
    if (processResponse.result !== 'ok') {
      return res.send(500, 'order processing error')
    }
    return res.json({ result: 'ok', value: order.orderNumber })
  } catch (e) {
    console.warn('error processing order:', e)
    return res.send(500, 'error processing order')
  }
})

server.listen(3006, function () {
  console.log('%s listening at %s', server.name, server.url)
})
