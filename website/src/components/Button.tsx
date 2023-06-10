import styled from 'styled-components'

export const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.secondaryColor};
  text-transform: uppercase;
  padding: 15px 30px;
  border: 2px solid ${({ theme }) => theme.secondaryColor};
  &:hover {
    color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.white};
  }

  &:disabled {
    border: none;
    background-color: ${({ theme }) => theme.disabled};
    color: ${({ theme }) => theme.white};
    cursor: default;
  }

  cursor: pointer;
`
