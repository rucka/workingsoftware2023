export { plugins } from './plugins'
export { preflight } from './cors'
export { authenticate } from './authenticate'
export { authorize } from './authorize'
export { authorizeService } from './authorizeService'
export { validatePayloadSignature } from './validatePayloadSignature'
export { parseUserToken as parseToken } from './parseUserToken'
export { SERVICE_TOKEN_KEY, parseServiceToken } from './parseServiceToken'

export type Response<T> = { result: 'ok'; value: T } | { result: 'ko' } | { result: 'error'; message: string }
