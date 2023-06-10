import React, { Children } from 'react'
import styled, { css, CSSProp, DefaultTheme } from 'styled-components'
import { device } from '../device'

const SectionContainer = styled.div<{ customCss: CSSProp<DefaultTheme> | undefined }>`
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
    /* height: 100vh; */
  }
  ${({ customCss }) => customCss ?? css``}
`
const SectionItem = styled.div<{ itemCount: number; customCss: CSSProp<DefaultTheme> | undefined }>`
  @media ${device.laptop} {
    width: 50%;
  }
  display: flex;
  justify-content: center;
  ${({ customCss }) => customCss ?? css``}
`
type SectionProps = { children: React.ReactNode; css?: CSSProp<DefaultTheme>; sectionItemCss?: CSSProp<DefaultTheme> }
export function Section({ children, css, sectionItemCss: sectionItemCss }: SectionProps) {
  const items = Children.toArray(children)
  return (
    <SectionContainer customCss={css}>
      {items.map((c: any, i) => (
        <SectionItem itemCount={items.length} key={i} customCss={sectionItemCss}>
          {c}
        </SectionItem>
      ))}
    </SectionContainer>
  )
}
