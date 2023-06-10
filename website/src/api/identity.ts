import { protectedPost, Response } from './misc'

export const host = 'http://0.0.0.0:3002'

export type UserCredentials = { id: string; role: 'admin' | 'customer' | 'content' | 'price' }
export type Role = UserCredentials['role']

export const signin: (email: string, password: string) => Promise<Response<UserCredentials>> = async (
  email,
  password
) => {
  const response = await fetch(`${host}/login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  if (response.status === 401) {
    return { result: 'ko' }
  }
  if (response.status === 200) {
    return await response.json()
  }
  return { result: 'error', message: response.statusText }
}

export const signout: () => Promise<string> = () => protectedPost(`${host}/logout`)
/*

export const signout = async () => {
  const response = await fetch(`${host}/logout`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  if (response.status === 200) {
    const result = await response.text()
    if (result === 'ok') {
      return { result: 'ok' }
    }
  }
  return { result: 'ko' }
}
*/
