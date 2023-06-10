import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { Box, Button, Centered, Page, Protected, TextAreaField, TextInputField } from '../components'
import { getProduct, ProductUpdate, updateProduct } from '../api'

const EditContentPage: NextPage = () => {
  const { push } = useRouter()
  const [product, setProduct] = useState<Partial<ProductUpdate>>({})
  const { isError, isLoading } = useQuery('getProduct', getProduct, { onSuccess: setProduct })
  const onSubmit = async () => {
    const name = product.name
    const description = product.description
    if (!name || !description) {
      return
    }
    const newProduct = await updateProduct({ name, description })
    setProduct(newProduct)
    push('/')
  }

  return (
    <Page title="Edit Content">
      <Protected roles={['admin', 'content']}>
        {() => {
          if (isLoading) {
            return <></>
          }
          if (isError) {
            return <div>Error loading product from server</div>
          }
          return (
            <Centered layoutMode="horizontally">
              <FormHeader>content</FormHeader>
              <Box>
                <Field>
                  <Label>name</Label>
                  <TextInputField
                    value={product.name ?? ''}
                    onChange={(t) => setProduct({ ...product, ...{ name: t } })}
                  />
                </Field>
                <Field>
                  <Label>description</Label>
                  <TextAreaField
                    style={{ minWidth: '300px', width: '100%' }}
                    rows={10}
                    value={product.description ?? ''}
                    onChange={(t) => setProduct({ ...product, ...{ description: t } })}
                  />
                </Field>
                <Button disabled={!product.name || !product.description} onClick={onSubmit}>
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

export default EditContentPage

const Field = styled.div`
  margin-bottom: 50px;
`

const FormHeader = styled.h1`
  text-transform: uppercase;
  padding-bottom: 20px;
`

const Label = styled.span`
  display: block;
  text-align: left;
`
