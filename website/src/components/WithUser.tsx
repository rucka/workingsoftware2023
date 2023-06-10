import { useAuth, User } from '../user-context'
import React from 'react'

type WithUserProps = { children: (user: User | undefined) => React.ReactElement }

export function WithUser({ children }: WithUserProps) {
  const { isLoading, user } = useAuth()
  if (isLoading) {
    return <>loading</>
  }
  return children(user)
}
