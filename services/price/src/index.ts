import restify from 'restify'
import { authenticate, authorize, parseToken, plugins, preflight } from '@workingsoftware2023/ts-shared/src/http'
import { getPrice, updatePrice } from './price'
import { sign } from '@workingsoftware2023/ts-shared/src/jwt'

const server = restify.createServer({ name: 'price service' })

server.pre(preflight)
server.use(...plugins(server))

server.get('/price', parseToken, authenticate, (_, res, _next) => {
  const r = sign({ price: getPrice() })
  if (r.result === 'ok') {
    return res.json(r.value)
  }
  return res.send(500, r.message)
})

server.post('/price', parseToken, authorize('admin', 'price'), (req, res, _) => {
  if (!req.body) {
    return res.send(422, 'expected price not provided')
  }
  const price = extractPriceFromBody(req.body)
  if (!price) {
    return res.send(422, 'expected price as number')
  }
  const updatedPrice = updatePrice(price)
  const signed = sign(updatedPrice)
  return res.json({ result: 'ok', value: signed })
})

const extractPriceFromBody: (body: unknown) => number | undefined = (body) => {
  if (typeof body === 'number') {
    return body
  }
  if (typeof body !== 'string') {
    return
  }
  try {
    return parseFloat(body)
  } catch {
    return
  }
}

server.listen(3005, function () {
  console.log('%s listening at %s', server.name, server.url)
})
