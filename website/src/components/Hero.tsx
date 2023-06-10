import React from 'react'
import { Product } from '../api'
import { Section } from '../components'
import { css } from 'styled-components'
import { HeroHeadline } from '../components/HeroHeadline'
import { heroHeightCss } from '../components/style'
import { HeroImage } from './HeroImage'
import { hexToRGB } from '../misc'

export function Hero({ product }: { product: Product }) {
  return (
    <Section
      css={heroHeightCss}
      sectionItemCss={css`
        align-items: center;
        &:nth-child(1) {
          background-color: ${({ theme }) => theme.black};
          color: white;
        }
      `}>
      <HeroHeadline name={product.name} />
      <HeroImage
        heroImageUrl={product.cover}
        css={css`
          z-index: -1;
          &:after {
            background-color: ${({ theme }) => hexToRGB(theme.secondaryColor, 0.45)};
          }
        `}
      />
    </Section>
  )
}
