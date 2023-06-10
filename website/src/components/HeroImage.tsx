import styled, { DefaultTheme, CSSProp } from 'styled-components'
import { device } from '../device'

const HeroImageBackground = styled.div<{ imageUrl: string; css: CSSProp<DefaultTheme> | undefined }>`
  position: relative;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  @media ${device.laptop} {
    height: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  ${({ css }) => css ?? ''}
`
type HeroImageProps = { heroImageUrl: string; css?: CSSProp<DefaultTheme> }
export function HeroImage({ heroImageUrl, css }: HeroImageProps) {
  return <HeroImageBackground imageUrl={heroImageUrl} css={css}></HeroImageBackground>
}
