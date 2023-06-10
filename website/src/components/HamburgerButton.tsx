import styled, { css } from 'styled-components'

const HamburgerButtonBar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.black};
`
const HamburgerButtonContainer = styled.div<{ opened: boolean }>`
  cursor: pointer;

  ${(props) => {
    return (
      props.opened &&
      css`
        ${HamburgerButtonBar}:nth-child(2) {
          opacity: 0;
        }

        ${HamburgerButtonBar}:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        ${HamburgerButtonBar}:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      `
    )
  }}
`

export function HamburgerButton({ opened, onClick }: { opened: boolean; onClick: () => void }) {
  return (
    <HamburgerButtonContainer opened={opened} onClick={onClick}>
      <HamburgerButtonBar></HamburgerButtonBar>
      <HamburgerButtonBar></HamburgerButtonBar>
      <HamburgerButtonBar></HamburgerButtonBar>
    </HamburgerButtonContainer>
  )
}
