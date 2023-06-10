import { RequestHandlerType } from 'restify'
import { verify } from '../jwt'

const ACCESS_TOKEN_KEY = 'x-access-tokens'
type User = { user_id: string; user_role: 'admin' | 'content' | 'price' | 'customer' }
export type Role = User['user_role']

declare module 'restify' {
  interface Request {
    user?: User
  }
}

export const parseUserToken: RequestHandlerType = (req, _, next) => {
  const token = req.cookies && req.cookies[ACCESS_TOKEN_KEY] ? req.cookies[ACCESS_TOKEN_KEY] : undefined

  if (!token) {
    return next()
  }
  const r = verify<User>(token)
  if (r.result === 'ko') {
    console.warn(r.message)
    return next()
  }
  req.user = r.value
  return next()
}
