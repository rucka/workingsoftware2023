import React from 'react'
import type { NextPage } from 'next'
import { getProduct } from '../controller'
import { Page, Footer, Hero, ProductSection } from '../components'
import { useQuery } from 'react-query'

const Home: NextPage = () => {
  const { isLoading, data, isError } = useQuery('getProduct', getProduct)

  if (isLoading) {
    return <div></div>
  }
  if (isError || !data) {
    return <div>sorry, something get wrong</div>
  }
  return (
    <Page title={`Product ${data.name}`}>
      <>
        <main>
          <Hero product={data} />
          <ProductSection product={data} />
        </main>

        <Footer />
      </>
    </Page>
  )
}

export default Home
