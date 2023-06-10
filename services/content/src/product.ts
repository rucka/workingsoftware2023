import product from './invisibility_shield.json'

type Product = typeof product
let currentProduct: Product = product

export const getProduct = () => currentProduct
export const updateProduct: (name: string, description: string) => Product = (name, description) => {
  currentProduct = { ...currentProduct, ...{ name, description } }
  return clone(currentProduct)
}

const clone = <T>(o: T) => JSON.parse(JSON.stringify(o))
