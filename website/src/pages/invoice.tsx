import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Protected } from '../components'
import { invoice } from '../controller'
import { Invoice } from '../components/Invoice'
import { useQuery } from 'react-query'

const InvoicePage: NextPage = () => {
  const { query } = useRouter()
  const { orderNumber } = query
  if (!orderNumber) {
    return <div>not order number provided</div>
  }
  return <Protected>{() => <InvoiceContent orderNumber={orderNumber as string} />}</Protected>
}
export default InvoicePage

const InvoiceContent = ({ orderNumber }: { orderNumber: string }) => {
  const { isLoading, data, isError } = useQuery('invoice', () => invoice(orderNumber))
  if (isLoading) {
    return <div></div>
  }
  if (isError || !data) {
    return <div>sorry, something get wrong</div>
  }
  return <Invoice invoice={data} />
}
