import { protectedGet, protectedPost, Signed } from './misc'

export const host = 'http://0.0.0.0:3005'

export type Price = { price: number }
export const getPrice: () => Promise<Signed<Price>> = () => protectedGet(`${host}/price`)
export const updatePrice: (price: number) => Promise<Signed<Price>> = (price) => protectedPost(`${host}/price`, price)
