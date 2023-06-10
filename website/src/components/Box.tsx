import styled from 'styled-components'
import { device } from '../device'

export const Box = styled.div`
  padding: 25px 50px;
  display: flex;
  flex-direction: column;

  text-align: center;
  @media ${device.laptop} {
    width: 80%;
    // border hole -> https://codepen.io/_dmin/pen/weeEWQ
    outline: 10px solid ${({ theme }) => theme.secondaryColor};
    outline-offset: 10px;
  }
`
