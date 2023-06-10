import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../user-context'
import { Empty } from './Empty'
import { HamburgerMenu } from './HamburgerMenu'
import { Logo } from './Logo'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${({ theme }) => theme.header.headerHeight};
  width: 100%;
`

const UserText = styled.span`
  font-size: 1em;
  font-weight: 300;
`

const Left = styled.div`
  padding: 0 ${({ theme }) => theme.containerMargin};
`

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 ${({ theme }) => theme.containerMargin};
`

export function Header() {
  const { user } = useAuth()
  const [opened, setOpened] = useState<boolean>(false)

  return (
    <HeaderContainer>
      <Left>
        <Logo />
      </Left>
      <Right>
        {user ? <UserText>{user.id}</UserText> : <Empty />}
        <HamburgerMenu opened={opened} onToggle={() => setOpened(!opened)}>
          <Home />
          <EditContent />
          <EditPrice />
          <LoginLogout
            onLogoutClick={() => {
              setOpened(false)
            }}
          />
        </HamburgerMenu>
      </Right>
    </HeaderContainer>
  )
}

const Home = () => {
  const { route } = useRouter()

  if (route === '/') {
    return <Empty />
  }
  return <Link href={'/'}>Home</Link>
}

const EditContent = () => {
  const { user } = useAuth()
  const { route } = useRouter()

  if (route === '/edit-content') {
    return <Empty />
  }
  if (!user || !['admin', 'content'].includes(user.role)) {
    return <Empty />
  }

  return <Link href={'/edit-content'}>Edit content</Link>
}

const EditPrice = () => {
  const { user } = useAuth()
  const { route } = useRouter()

  if (route === '/edit-price') {
    return <Empty />
  }

  if (!user || !['admin', 'price'].includes(user.role)) {
    return <Empty />
  }

  return <Link href={'/edit-price'}>Edit price</Link>
}

const LoginLogout = ({ onLogoutClick }: { onLogoutClick?: () => void }) => {
  const { isLoggedIn, onLogout } = useAuth()
  const { route } = useRouter()

  return isLoggedIn ? (
    <a
      onClick={(e) => {
        e.preventDefault()
        if (onLogoutClick) {
          onLogoutClick()
        }
        onLogout()
      }}>
      Logout
    </a>
  ) : route !== '/signin' ? (
    <Link href={'/signin'}>Login</Link>
  ) : (
    <Empty />
  )
}
