import React from 'react'
import Router from 'next/router'
import { WithUser } from './WithUser'

type UnAuthenticatedProps = { children: React.ReactElement; redirectTo?: string }
export function UnAuthenticated({ children, redirectTo }: UnAuthenticatedProps) {
  return (
    <WithUser>
      {(user) => {
        if (user) {
          Router.push(redirectTo ?? '/')
          return <></>
        }
        return children
      }}
    </WithUser>
  )
}
