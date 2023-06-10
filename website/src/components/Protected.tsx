import React from 'react'
import { useRouter } from 'next/router'
import { WithUser } from './WithUser'
import { User } from '../user-context'
import { Role } from '../api'

type ProtectedProps = { children: (user: User) => React.ReactElement; redirectTo?: string; roles?: Role[] }
export function Protected({ children, redirectTo, roles }: ProtectedProps) {
  const { push } = useRouter()
  return (
    <WithUser>
      {(user) => {
        if (!user || (roles && !roles.includes(user.role))) {
          push(redirectTo ?? '/signin')
          return <></>
        }
        return children(user)
      }}
    </WithUser>
  )
}
