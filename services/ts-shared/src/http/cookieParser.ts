import restify, { RequestHandlerType } from 'restify'
import cookie from 'cookie'

declare module 'restify' {
  interface Request {
    cookies?: { [key: string]: string }
  }
}

export const cookieParser: RequestHandlerType = (req: restify.Request, _: unknown, next: restify.Next) => {
  var cookieHeader = req.headers.cookie

  if (cookieHeader) {
    req.cookies = cookie.parse(cookieHeader)
  } else {
    req.cookies = {}
  }

  next()
}
