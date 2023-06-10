import * as React from 'react'
import { UserCredentials, Profile, me } from './api'

export type User = UserCredentials & Profile

export type UserState = (
  | {
      state: 'loading'
    }
  | {
      state: 'loggedout'
    }
  | { state: 'loggedin'; user: User }
) & { onLogin: (credentials: UserCredentials) => void; onLogout: () => void }

const defaultUserState: UserState = {
  state: 'loading',
  onLogin: (_: UserCredentials) => {},
  onLogout: () => {}
}

const createUser: (c: UserCredentials, p: Profile) => User = (c, p) => ({
  ...c,
  ...p
})

const userFromCredentials: (c: UserCredentials) => User = (c) => {
  const profile: Profile = {
    id: c.id,
    name: c.id
  }
  return createUser(c, profile)
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

const getSessionLoggedCredentials = () => {
  const userAsString: string | null = window.sessionStorage.getItem(USER_KEY)
  if (!userAsString) {
    return undefined
  }
  return JSON.parse(userAsString) as User
}
const setSessionLoggedCredentials = (c: UserCredentials) => {
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(c))
}
const resetSessionLoggedCredentials = () => {
  window.sessionStorage.removeItem(USER_KEY)
}

export const useUserState = () => {
  const [userState, setUserState] = React.useState<UserState>(defaultUserState)
  React.useEffect(() => {
    const user = getSessionLoggedCredentials()
    if (!user) {
      onLogout()
      return
    }
    onLogin(user).catch((e) => console.warn('Unexpected error during login:', e))
  }, [])

  const onLogin = async (credentials: UserCredentials) => {
    let user: User | undefined = undefined
    try {
      const profile = await me()
      user = createUser(credentials, profile)
    } catch (e) {
      console.warn('ko getting profile:', e)
      user = userFromCredentials(credentials)
    }
    setSessionLoggedCredentials(credentials)
    setUserState({ state: 'loggedin', user, onLogin, onLogout })
  }
  const onLogout = () => {
    resetSessionLoggedCredentials()
    setUserState({ state: 'loggedout', onLogin, onLogout })
  }
  return userState
}
