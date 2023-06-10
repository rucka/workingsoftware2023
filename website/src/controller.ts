const host = 'http://0.0.0.0:3002'

export type User = { id: string; role: 'admin' | 'customer' | 'content' | 'price' }
export type Role = User['role']

type Response<T> = { result: 'ok'; value: T } | { result: 'ko' } | { result: 'error'; message: string }

type SigninResponse = Response<User>
export const signin: (email: string, password: string) => Promise<SigninResponse> = async (email, password) => {
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
    const result = await response.text()
    if (result === 'ok') {
      return await user()
    }
    return { result: 'ko' }
  }
  return { result: 'error', message: response.statusText }
}

const user: () => Promise<Response<User>> = async () => {
  const response = await fetch(`${host}/me`, {
    credentials: 'include'
  })
  if (response.status === 200) {
    const result: User = await response.json()
    return { result: 'ok', value: result }
  }
  return { result: 'error', message: response.statusText }
}

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

export type Product = { name: string; cover: string; carousel: string[]; description: string }
export const getProduct: () => Promise<Product> = async () => {
  const response = await fetch(`${host}/product`)
  if (response.status === 200) {
    const value = (await response.json()) as Product
    return value
  }
  throw new Error('request error. Status:' + response.statusText)
}

export type ProductUpdate = Pick<Product, 'name' | 'description'>
export const updateProduct: (product: ProductUpdate) => Promise<ProductUpdate> = async (product) => {
  const response = await fetch(`${host}/product`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(product)
  })
  if (response.status === 200) {
    const r: Response<ProductUpdate> = await response.json()
    if (r.result == 'ok') {
      return r.value
    }
  }
  throw new Error('request error. Status:' + response.statusText)
}

export const getPrice: () => Promise<number> = async () => {
  const response = await fetch(`${host}/price`, { credentials: 'include' })
  if (response.status === 200) {
    const value = await response.text()
    return parseFloat(value)
  }
  throw new Error('request error. Status:' + response.statusText)
}

export const updatePrice: (price: number) => Promise<number> = async (price) => {
  const response = await fetch(`${host}/price`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(price)
  })
  if (response.status === 200) {
    const r: Response<number> = await response.json()
    if (r.result == 'ok') {
      return r.value
    }
  }
  throw new Error('request error. Status:' + response.statusText)
}

export const checkout: () => Promise<string> = async () => {
  const response = await fetch(`${host}/checkout`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include'
  })
  if (response.status === 200) {
    const r: Response<string> = await response.json()
    if (r.result == 'ok') {
      return r.value
    }
  }
  throw new Error('request error. Status:' + response.statusText)
}

export type Invoice = {
  number: string
  created: string
  due: string
  issuer: {
    name: string
    address: string
    city: string
  }
  customer: {
    name: string
    address: string
    city: string
    email: string
  }
  items: { name: string; amount: string }[]
  total: string
}

export const invoice: (orderNumber: string) => Promise<Invoice> = async (orderNumber: string) => {
  const response = await fetch(`${host}/invoice/${orderNumber}`, { credentials: 'include' })
  if (response.status === 200) {
    const r: Response<Invoice> = await response.json()
    if (r.result == 'ok') {
      return r.value
    }
  }
  throw new Error('request error. Status:' + response.statusText)
}
