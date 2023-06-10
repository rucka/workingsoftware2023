import { RequestHandlerType } from 'restify'
import * as _ from './parseUserToken'

export const authenticate: RequestHandlerType = (req, res, next) => {
  if (!req.user) {
    return res.send(401, 'ko')
  }
  return next()
}
