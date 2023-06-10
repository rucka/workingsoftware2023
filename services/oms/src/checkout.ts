import axios, { AxiosRequestHeaders } from 'axios'
import { encode, sign, Signed } from '@workingsoftware2023/ts-shared/src/jwt'
import { Response, SERVICE_TOKEN_KEY } from '@workingsoftware2023/ts-shared/src/http'
import { Service } from '@workingsoftware2023/ts-shared/src/http/parseServiceToken'

const orderNumbers: string[] = []

type Order = {
  orderNumber: string
  products: { name: string; description: string; price: number }[]
  customer: { customer_id: string; name: string; email: string }
}

export function placeOrder(
  price: number,
  profile: { name: string; id: string },
  product: { name: string; description: string }
) {
  const orderNumber = 'CS00' + String(orderNumbers.length + 1) + '-2022'
  orderNumbers.push(orderNumber)
  const order = {
    orderNumber,
    products: [{ name: product.name, description: product.description, price: price }],
    customer: { customer_id: profile.id, name: profile.name, email: profile.id }
  }

  return sign(order)
}

type InvoiceNumber = string
const host = 'http://0.0.0.0:3007'
export const processOrder: (order: Signed<Order>) => Promise<Response<InvoiceNumber>> = async (order) => {
  const serviceHeadersResponse = createServiceAccountHeader()
  if (serviceHeadersResponse.result !== 'ok') {
    return { result: 'error', message: `invoice error: cannot encode service token` }
  }

  const response = await axios.post<Response<InvoiceNumber>>(
    `${host}/invoice`,
    { order },
    {
      headers: serviceHeadersResponse.value
    }
  )
  if (response.status === 200) {
    return response.data
  }
  return { result: 'error', message: `invoice error: ${response.statusText}` }
}

const createServiceAccountHeader = () => {
  const serviceAccount: Service = { name: 'oms' }
  const encodingResponse = encode(serviceAccount, '30s')

  if (encodingResponse.result !== 'ok') {
    return encodingResponse
  }
  const serviceHeaders: AxiosRequestHeaders = {}
  serviceHeaders[`${SERVICE_TOKEN_KEY}`] = encodingResponse.value
  return { result: 'ok', value: serviceHeaders }
}
