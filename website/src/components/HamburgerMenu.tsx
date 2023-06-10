import React from 'react'
import styled, { css } from 'styled-components'
import { HamburgerButton } from './HamburgerButton'

const Navigator = styled.nav`
  padding-left: 20px;
`

const NavMenu = styled.ul<{ opened: boolean }>`
  position: fixed;
  flex-direction: column;
  left: 0;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  border-radius: 10px;
  text-align: center;
  transition: 0.3s;
  box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

  * {
    box-sizing: border-box;
  }

  font-size: 62.5%;
  font-family: ${({ theme }) => theme.header.fontFamily};

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  ${({ opened }) =>
    opened
      ? css`
          top: 0px;
        `
      : css`
          top: -1000px;
        `}
`

const NavMenuItem = styled.li`
  margin: 2.5rem 0 2.5rem 0;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};

  a {
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.black};
  }

  a:hover {
    color: ${({ theme }) => theme.secondaryColor};
  }
`

export function HamburgerMenu({
  children,
  opened,
  onToggle
}: {
  children: React.ReactNode
  opened: boolean
  onToggle?: () => void
}) {
  return (
    <Navigator>
      <NavMenu opened={opened}>
        {React.Children.toArray(children).map((c: any, i) => {
          return <NavMenuItem key={i}>{c}</NavMenuItem>
        })}
      </NavMenu>
      <HamburgerButton opened={opened} onClick={() => (onToggle ? onToggle() : () => {})} />
    </Navigator>
  )
}
