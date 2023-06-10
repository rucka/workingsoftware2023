import { css } from 'styled-components'
import { device } from '../device'

export const inputCssStyle = css`
  width: 100%;
  border: 0;
  color: ${({ theme }) => theme.secondaryColor};
  border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};
  padding-bottom: 5px;
  font-size: 1rem;
`
export const heroHeightCss = css`
  height: unset;
  @media ${device.laptop} {
    height: calc(100vh - ${({ theme }) => theme.header.headerHeight} - 100px);
  }
`
