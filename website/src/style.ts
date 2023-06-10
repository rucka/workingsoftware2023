import { createGlobalStyle, DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string
    secondaryColor: string
    black: string
    white: string
    disabled: string
    error: string
    containerMargin: string
    header: { headerHeight: string; fontFamily: string }
  }
}

export const theme: DefaultTheme = {
  primaryColor: 'white',
  secondaryColor: '#878a62',
  black: '#1f2429',
  white: 'white',
  disabled: 'gray',
  error: '#ff3333',
  containerMargin: '30px',
  header: { headerHeight: '60px', fontFamily: 'inherit' }
}

export const GlobalStyle = createGlobalStyle`
html{
  font-family: 'Rubik', sans-serif;
  box-sizing: border-box;
  display:block;
  height: 100%;
  max-width: 640px;
  margin:0 auto;
  padding: 0;
}

body{
  min-width:100vw;
  min-height:100vh;

  margin:0;
  padding: 0;
}

html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        min-height:100vh;
        min-width:100vw;
        margin: 0;
        padding: 0; 
      }
`
