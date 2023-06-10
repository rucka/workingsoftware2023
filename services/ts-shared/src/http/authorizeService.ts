import { RequestHandlerType } from 'restify'
import * as _ from './parseServiceToken'

export const authorizeService: (...names: string[]) => RequestHandlerType =
  (...names) =>
  (req, res, next) => {
    if (!req.service || !names.includes(req.service.name)) {
      return res.send(401, 'ko')
    }

    return next()
  }
