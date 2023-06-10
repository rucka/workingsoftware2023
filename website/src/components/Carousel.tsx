import { useState } from 'react'
import styled, { css, CSSProp, DefaultTheme } from 'styled-components'
import { useInterval } from '../useInterval'

type Direction = 'horizontal' | 'vertical'
type CarouselProps = {
  images: string[]
  containerCss?: CSSProp<DefaultTheme> | undefined
  direction: Direction
}

const CarouselContainer = styled.div<{
  containerCss: CSSProp<DefaultTheme> | undefined
}>`
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  ${({ containerCss }) => containerCss ?? ''}
`

const ImageContainer = styled.div<{ active: boolean; direction: Direction }>`
  ${({ direction }) =>
    direction === 'horizontal'
      ? css`
          width: 100%;
          height: unset;
        `
      : css`
          height: 100%;
          width: unset;
        `}

  position: absolute;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity ease-in-out 0.4s;
`

const Img = styled.img<{ direction: Direction }>`
  ${({ direction }) =>
    direction === 'horizontal'
      ? css`
          width: 100%;
          height: unset;
        `
      : css`
          height: 100%;
          width: unset;
        `}

  object-fit: cover;
`

export function Carousel({ images, containerCss, direction }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  useInterval(() => {
    const next = (current + 1) % images.length
    setCurrent(next)
  }, 5000)
  return (
    <CarouselContainer containerCss={containerCss}>
      {images.map((img, i) => (
        <ImageContainer key={i} active={i === current} direction={direction}>
          <Img src={img} alt="" direction={direction} />
        </ImageContainer>
      ))}
    </CarouselContainer>
  )
}
