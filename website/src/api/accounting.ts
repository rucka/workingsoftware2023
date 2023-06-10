import { protectedGet } from './misc'

export const host = 'http://0.0.0.0:3007'

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

export const invoice: (orderNumber: string) => Promise<Invoice> = (orderNumber: string) =>
  protectedGet(`${host}/invoice/${orderNumber}`)
