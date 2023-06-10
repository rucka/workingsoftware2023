import { readFileSync } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import { tobase64, frombase64 } from './base64'

const ALGORITHM = 'HS256'
const JWT_BASE64_HEADER = tobase64({
  alg: ALGORITHM,
  typ: 'JWT'
})

export type Expiring<T> = T & { iat?: number; exp: number }
export type Signed<T> = Expiring<T> & { __signature__: string }

export const toSigned: <T>(o: T) => Signed<T> | undefined = <T>(o: T) => {
  const candidate = o as Signed<T>
  if (candidate.__signature__) {
    return o as Signed<T>
  }
  return
}

export const isSigned = <T = {}>(o: T): o is Signed<T> => (o as Signed<T>).__signature__ !== undefined

const secretPath = path.join(__filename, '../../../SECRET')
const SECRET = readFileSync(secretPath, { encoding: 'utf-8' })

type Result<T> = { result: 'ok'; value: T } | { result: 'ko'; message: string }
export function verify<T>(token: string): Result<T> {
  try {
    const payload = jwt.verify(token, SECRET)
    return { result: 'ok', value: payload as T }
  } catch (e: any) {
    if (e.name && e.message) {
      return { result: 'ko', message: e.message }
    }
    return { result: 'ko', message: 'unkown error' }
  }
}

export function encode(payload: unknown, expiresIn: string | number): Result<string> {
  try {
    const token = jwt.sign(payload as object, SECRET, {
      algorithm: ALGORITHM,
      expiresIn: expiresIn ?? '30d'
    })
    return { result: 'ok', value: token }
  } catch (e: any) {
    if (e.name && e.message) {
      return { result: 'ko', message: e.message }
    }
    return { result: 'ko', message: 'unkown error' }
  }
}

export function sign<T>(payload: T): Result<Signed<T>> {
  const r = encode(payload, '1h')
  if (r.result === 'ko') {
    return r
  }
  const [header, payloadBase64, signature] = r.value.split('.')
  if (!header || !payloadBase64 || !signature) {
    return { result: 'ko', message: 'invalid token to decode' }
  }
  const signedPayload = buildSignedPayload<T>(payloadBase64, signature)
  return { result: 'ok', value: signedPayload }
}

export function extractJwt(signed: Signed<unknown>) {
  const { __signature__: signature, iat, exp, ...payload } = signed
  const payloadBase64 = tobase64({ ...payload, iat, exp })
  return `${JWT_BASE64_HEADER}.${payloadBase64}.${signature}`
}

function buildSignedPayload<T>(payloadBase64: string, signature: string): Signed<T> {
  const expiringPayload = frombase64<Expiring<T>>(payloadBase64)
  return { ...expiringPayload, ...{ __signature__: signature } }
}
