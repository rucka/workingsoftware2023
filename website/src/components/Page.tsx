import { Header } from '.'
import React from 'react'
import Head from 'next/head'
import { GlobalStyle } from '../style'

export function Page({ children, title }: { children: React.ReactElement; title?: string }) {
  return (
    <>
      <Head>
        <title>Workingsoftware 2023{title ? ` - ${title}` : ''}</title>
      </Head>
      <GlobalStyle />
      <Header />
      {children}
    </>
  )
}
