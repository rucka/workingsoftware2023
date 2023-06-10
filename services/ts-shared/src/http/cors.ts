import { RequestHandlerType } from 'restify'

export const cors: RequestHandlerType = (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization'
  )
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time')
  res.header('Access-Control-Max-Age', '1000')

  return next()
}

export const preflight: RequestHandlerType = (req, res, next) => {
  if (req.method?.toLowerCase() === 'options') {
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version']
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '))
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    return res.send(204)
  }
  next()
}
