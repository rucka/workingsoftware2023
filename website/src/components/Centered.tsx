import styled, { css } from 'styled-components'

type Mode = 'both' | 'horizontally' | 'vertically'

export const Centered = styled.div<{ layoutMode?: Mode }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${({ layoutMode: mode }) =>
    !mode || mode === 'both' || mode === 'vertically'
      ? css`
          justify-content: center;
        `
      : ''}
  ${({ layoutMode: mode }) =>
    !mode || mode === 'both' || mode === 'horizontally'
      ? css`
          align-items: center;
        `
      : ''}
`
