import React from 'react'
import { Product } from '../api'
import { Carousel, Section } from '.'
import styled, { css } from 'styled-components'
import { device } from '../device'

export function ProductSection({ product }: { product: Product }) {
  return (
    <Section>
      <ProductDescription>
        <h2>THE PRODUCT</h2>
        {product.description}
      </ProductDescription>
      <Carousel images={product.carousel} containerCss={carouselStyle} direction="vertical" />
    </Section>
  )
}

const ProductDescription = styled.div`
  margin: 20px ${({ theme }) => theme.containerMargin};
  line-height: 1.9;
  letter-spacing: 0.1rem;
`
const carouselStyle = css`
  width: 100%;
  height: ${850 * 0.8}px;
  @media ${device.laptop} {
    margin: 120px 0;
    height: ${850 * 0.6}px;
  }
`
