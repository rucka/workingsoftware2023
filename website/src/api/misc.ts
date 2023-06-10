type ResponseOk<T> = { result: 'ok'; value: T }
export type Response<T> = ResponseOk<T> | { result: 'ko' } | { result: 'error'; message: string }

type Expiring<T> = T & { iat?: number; exp: number }
export type Signed<T> = Expiring<T> & { __signature__: string }

export const protectedGet = <T>(url: string) => get<T>(url, true)
export const publicGet = <T>(url: string) => get<T>(url, false)

export const protectedPost = <T, K>(url: string, body?: K) => post<T, K>(url, true, body)
export const publicPost = <T, K>(url: string, body?: K) => post<T, K>(url, false, body)

async function get<T>(url: string, includeCredentials: boolean): Promise<T> {
  const credentials: { credentials: 'include' } | {} = includeCredentials === true ? { credentials: 'include' } : {}

  const response = await fetch(url, { ...credentials })
  if (response.status === 200) {
    const value = (await response.json()) as T
    return value
  }
  throw new Error('request error. Status:' + response.statusText)
}

async function post<T, K>(url: string, includeCredentials: boolean, body?: K): Promise<T> {
  const credentials: { credentials: 'include' } | {} = includeCredentials === true ? { credentials: 'include' } : {}

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    ...credentials,
    body: body ? JSON.stringify(body) : ''
  })
  if (response.status === 200) {
    const r: Response<T> = await response.json()
    if (r.result == 'ok') {
      return r.value
    }
  }
  throw new Error('request error. Status:' + response.statusText)
}
