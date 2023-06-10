import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthProvider, useUserState } from '../user-context'
import { EventuallyRedirectFromLocalhost } from '../components'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../style'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const userState = useUserState()

  return (
    <>
      <Head>
        <meta name="description" content="demo Workingsoftware 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider value={userState}>
            <EventuallyRedirectFromLocalhost />
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
