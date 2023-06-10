import restify, { RequestHandlerType } from 'restify'
import { cookieParser } from './cookieParser'
import { cors } from './cors'
import { parseUserToken } from './parseUserToken'

const bodyParser = (server: restify.Server) => [
  ...restify.plugins.bodyParser({
    mapParams: true
  }),
  restify.plugins.acceptParser(server.acceptable)
]

export const plugins: (server: restify.Server) => RequestHandlerType[] = (server) => [
  cookieParser,
  ...bodyParser(server),
  cors,
  parseUserToken
]
