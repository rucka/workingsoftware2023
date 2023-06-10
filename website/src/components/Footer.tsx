import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.black};
`

export function Footer() {
  return <FooterContainer></FooterContainer>
}
