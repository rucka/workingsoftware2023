import { RequestHandlerType } from 'restify'
import { extractJwt, isSigned, verify } from '../jwt'

const tryDecode = (p: unknown) => {
  const token = extractJwt(p as any)
  const decoded = verify(token)
  if (decoded.result === 'ko') {
    throw Error(decoded.message)
  }
  return decoded.value
}

export const validatePayloadSignature: RequestHandlerType = (req, _, next) => {
  const params: unknown = req.params
  if (!isAnObject(params)) {
    return next()
  }
  if (isParamSigned(params)) {
    tryDecode(params)
    return next()
  }
  req.params = eventuallyTryDecodeFields(params)
  return next()
}

function isAnObject(params: unknown): params is { [k: string]: unknown } {
  return params !== undefined && typeof params === 'object'
}
const isParamSigned = (param: object) => isSigned<{}>(param)

const eventuallyTryDecodeFields = (params: { [key: string]: unknown }) => {
  return Object.keys(params).reduce<{ [k: string]: any }>((p, k) => {
    const v = params[k]
    p[k] = tryDecode(v)
    return p
  }, {})
}
