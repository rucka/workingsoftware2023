import { RequestHandlerType } from 'restify'
import * as _ from './parseUserToken'
import { Role } from './parseUserToken'

export const authorize: (...roles: Role[]) => RequestHandlerType =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.user_role)) {
      return res.send(401, 'ko')
    }

    return next()
  }
