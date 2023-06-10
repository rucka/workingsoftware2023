import styled from 'styled-components'
import { Box } from './Box'
import { PriceLine } from './PriceLine'

export function HeroHeadline({ name }: { name: string }) {
  return (
    <HeadlineContainer>
      <HeadLineText>{name}</HeadLineText>
      <PriceLine />
    </HeadlineContainer>
  )
}

const HeadlineContainer = styled(Box)`
  max-width: 300px;
  min-height: 300px;
  justify-content: space-around;
`
const HeadLineText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 3em;
  font-weight: 900;
  display: inline-block;
  color: ${({ theme }) => theme.white};
`
