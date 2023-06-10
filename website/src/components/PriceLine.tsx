import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { checkout, getPrice, me, getProduct } from '../api'
import { useAuth } from '../user-context'
import { Button } from './Button'
import { Error } from './Error'

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.secondaryColor};
`
const Price = styled.span`
  font-family: 'Kaushan+Script', cursive;
  font-size: 1.3rem;
`

export const PriceLine = () => {
  const { isLoading, isLoggedIn } = useAuth()

  if (isLoading) {
    return <></>
  }
  if (isLoggedIn) {
    return <LoggedInPriceLine />
  }
  return <GuestPriceLine />
}

const GuestPriceLine = () => {
  const { push } = useRouter()

  return (
    <PriceContainer>
      <Button onClick={() => push('/signin')}>reveal the price</Button>
    </PriceContainer>
  )
}

const LoggedInPriceLine = () => {
  const { push } = useRouter()
  const { isLoading, isError, data } = useQuery('getPrice', getPrice)

  if (isLoading) {
    return <></>
  }

  if (isError) {
    return <Error>cannot get price, please retry later</Error>
  }

  const onBuy = async () => {
    if (!data) {
      return
    }
    const profile = await me()
    const product = await getProduct()

    const orderNumber = await checkout(profile, product, data)
    push({ pathname: '/invoice', query: { orderNumber } })
  }

  return (
    <PriceContainer>
      <Price>EUR {data?.price}</Price>
      <Button onClick={onBuy}>buy now</Button>
    </PriceContainer>
  )
}
