import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { inputCssStyle } from './style'

export type TextInputFieldProps = {
  value: string
  onChange: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

const Input = styled.input`
  ${() => inputCssStyle}
  height: 32px;
`

export function TextInputField({ value, onChange, ...props }: TextInputFieldProps) {
  const [text, setText] = useState<string>(value ?? '')

  useEffect(() => {
    setText(value ?? '')
  }, [value])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setText(v)
    onChange(v)
  }

  return <Input type={'text'} {...props} value={text} onChange={onInputChange} />
}
