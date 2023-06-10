import type { NextPage } from 'next'
import { useState } from 'react'
import { getPrice, updatePrice } from '../api'
import { Box, Button, Centered, NumericInputField, Page, Protected } from '../components'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from 'react-query'

const EditPricePage: NextPage = () => {
  const { push } = useRouter()
  const [price, setPrice] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)

  const { isError, isLoading } = useQuery('getPrice', getPrice, {
    onSuccess: (p) => {
      setPrice(p.price)
      setDisabled(false)
    }
  })

  const onSubmit = async () => {
    const newPrice = await updatePrice(price)
    setPrice(newPrice.price)
    push('/')
  }

  const onInvalidContent = () => {
    setDisabled(true)
  }

  return (
    <Page title="Edit Price">
      <Protected roles={['admin', 'price']}>
        {() => {
          if (isLoading) {
            return <></>
          }
          if (isError) {
            return <div>Error loading price from server</div>
          }
          return (
            <Centered layoutMode="horizontally">
              <FormHeader>price</FormHeader>
              <Box style={{ maxWidth: 300 }}>
                <Field>
                  <Label>price</Label>
                  <NumericInputField
                    value={price}
                    onChange={(v) => {
                      setPrice(v)
                      setDisabled(false)
                    }}
                    onInvalidContent={onInvalidContent}
                  />
                </Field>

                <Button disabled={disabled} onClick={onSubmit}>
                  submit
                </Button>
              </Box>
            </Centered>
          )
        }}
      </Protected>
    </Page>
  )
}

export default EditPricePage

const Field = styled.div`
  margin-bottom: 20px;
`

const FormHeader = styled.h1`
  text-transform: uppercase;
  padding-bottom: 20px;
`

const Label = styled.span`
  display: block;
  text-align: left;
`
