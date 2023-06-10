import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { inputCssStyle } from './style'

export type TextAreaFieldProps = {
  value: string
  onChange: (v: string) => void
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

const Textarea = styled.textarea`
  ${() => inputCssStyle}
`

export function TextAreaField({ value, onChange, ...props }: TextAreaFieldProps) {
  const [text, setText] = useState<string>(value ?? '')

  useEffect(() => {
    setText(value ?? '')
  }, [value])

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    setText(v)
    onChange(v)
  }

  return <Textarea {...props} value={text} onChange={onInputChange} />
}
