import { publicGet, protectedPost, Signed } from './misc'

export const host = 'http://0.0.0.0:3004'

export type Product = { name: string; cover: string; carousel: string[]; description: string }
export const getProduct = () => publicGet<Signed<Product>>(`${host}/product`)

export type ProductUpdate = Pick<Product, 'name' | 'description'>
export const updateProduct: (product: ProductUpdate) => Promise<Signed<ProductUpdate>> = (product) =>
  protectedPost(`${host}/product`, product)
