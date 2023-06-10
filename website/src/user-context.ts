import * as React from 'react'
import { User } from './controller'

export type UserState = (
  | {
      state: 'loading'
    }
  | {
      state: 'loggedout'
    }
  | { state: 'loggedin'; user: User }
) & { onLogin: (user: User) => void; onLogout: () => void }

const defaultUserState: UserState = {
  state: 'loading',
  onLogin: (_: User) => {},
  onLogout: () => {}
}

const AuthContext = React.createContext<UserState>(defaultUserState)
export const AuthProvider = AuthContext.Provider

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return {
    isLoggedIn: context.state === 'loggedin',
    isLoading: context.state === 'loading',
    isLoggedOut: context.state === 'loggedout',
    onLogin: context.onLogin,
    onLogout: context.onLogout,
    user: context.state === 'loggedin' ? context.user : undefined
  }
}

const USER_KEY = 'USER'

const getSessionLoggedUser = () => {
  const userAsString: string | null = window.sessionStorage.getItem(USER_KEY)
  if (!userAsString) {
    return undefined
  }
  return JSON.parse(userAsString) as User
}
const setSessionLoggedUser = (u: User) => {
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(u))
}
const resetSessionLoggedUser = () => {
  window.sessionStorage.removeItem(USER_KEY)
}

export const useUserState = () => {
  const [userState, setUserState] = React.useState<UserState>(defaultUserState)
  React.useEffect(() => {
    const user = getSessionLoggedUser()
    if (!user) {
      onLogout()
      return
    }
    onLogin(user)
  }, [])

  const onLogin = (user: User) => {
    setSessionLoggedUser(user)
    setUserState({ state: 'loggedin', user, onLogin, onLogout })
  }
  const onLogout = () => {
    resetSessionLoggedUser()
    setUserState({ state: 'loggedout', onLogin, onLogout })
  }
  return userState
}
