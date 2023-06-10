import { protectedPost, Signed } from './misc'
import { Price } from './price'
import { Profile } from './profile'
import { Product } from './content'

export const host = 'http://0.0.0.0:3006'
export const checkout: (
  profile: Signed<Profile>,
  product: Signed<Product>,
  price: Signed<Price>
) => Promise<string> = async (profile, product, price) => {
  const body = { price, profile, product }

  return await protectedPost(`${host}/checkout`, body)
}
