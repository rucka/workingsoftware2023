import restify from 'restify'
import { authorize, plugins, preflight } from '@workingsoftware2023/ts-shared/src/http'
import { getProduct, updateProduct } from './product'
import { sign } from '@workingsoftware2023/ts-shared/src/jwt'

const server = restify.createServer({ name: 'content management system' })

server.pre(preflight)
server.use(...plugins(server))

server.get('/product', (_, res, _next) => {
  const r = sign(getProduct())
  if (r.result === 'ok') {
    return res.json(r.value)
  }
  return res.send(500, r.message)
})

server.post('/product', authorize('admin', 'content'), (req, res, _) => {
  if (!req.body) {
    res.send(422, 'expected product as object with name and description')
  }
  const { name, description }: { name?: string; description?: string } = req.body
  if (!name || name.length === 0) {
    return res.send(422, 'expected product with name')
  }
  if (!description || description.length === 0) {
    return res.send(422, 'expected product with description')
  }
  const product = updateProduct(name, description)
  const signed = sign(product)
  return res.json(signed)
})

server.listen(3004, function () {
  console.log('%s listening at %s', server.name, server.url)
})
