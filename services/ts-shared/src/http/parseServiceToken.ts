import { RequestHandlerType } from 'restify'
import { verify } from '../jwt'

export const SERVICE_TOKEN_KEY = 'x-service-tokens'
export type Service = { name: string }

declare module 'restify' {
  interface Request {
    service?: Service
  }
}

export const parseServiceToken: RequestHandlerType = (req, _, next) => {
  const token: string | undefined = req.header(SERVICE_TOKEN_KEY)
  if (!token) {
    return next()
  }
  const r = verify<Service>(token)
  if (r.result === 'ko') {
    console.warn(r.message)
    return next()
  }
  req.service = r.value
  return next()
}
