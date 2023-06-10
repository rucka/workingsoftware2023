import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { inputCssStyle } from './style'

export type NumericInputFieldProps = {
  value: number
  onChange: (v: number) => void
  onInvalidContent?: () => void
}

const Input = styled.input`
  ${() => inputCssStyle}
`

export function NumericInputField({ value, onChange, onInvalidContent }: NumericInputFieldProps) {
  const [text, setText] = useState<string>(String(value ?? ''))

  useEffect(() => {
    setText(String(value ?? ''))
  }, [value])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (v === '' || !v) {
      setText(v)
      if (onInvalidContent) {
        onInvalidContent()
      }
      return
    }
    const numberParts = v.split('.')
    if (numberParts.length > 2) {
      return
    }
    const decimalString = numberParts.length === 2 ? numberParts[1] : ''
    if (decimalString && decimalString.length > 2) {
      return
    }
    if (numberParts.length == 2 && !decimalString) {
      setText(v)
      if (onInvalidContent) {
        onInvalidContent()
      }
      return
    }
    try {
      const v = parseFloat(e.target.value)
      const change = isNaN(v) ? undefined : v
      if (change) {
        onChange(change)
      }
      if (!change && onInvalidContent) {
        onInvalidContent()
      }
    } catch {}
  }

  return <Input type={'text'} value={text} onChange={onInputChange} />
}
