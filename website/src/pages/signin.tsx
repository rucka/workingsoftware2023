import { useState } from 'react'
import Router from 'next/router'
import { signin } from '../controller'
import { useAuth } from '../user-context'
import { UnAuthenticated } from '../components/UnAuthenticated'
import { Box, Button, Centered, Empty, Page, TextInputField, Error } from '../components'
import styled from 'styled-components'

const Container = styled(Box)`
  width: 80%;
  max-width: 250px;
  justify-content: space-around;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 40px;

  input:nth-child(1) {
    margin-bottom: 20px;
  }
`

export default function SigninPage() {
  const { onLogin } = useAuth()

  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async () => {
    if (!email || !password) {
      return
    }
    const response = await signin(email, password)
    if (response.result === 'ok') {
      onLogin(response.value)
      Router.push('/')
      return
    }
    if (response.result === 'ko') {
      setError('Email o password non validi, riprovare')
      return
    }
    setError(response.message)
  }

  return (
    <Page title="Signin">
      <UnAuthenticated>
        <Centered>
          <Container>
            <InputContainer>
              <TextInputField placeholder="email" onChange={setEmail} required value={email ?? ''} />
              <TextInputField
                type="password"
                placeholder="password"
                onChange={setPassword}
                required
                value={password ?? ''}
              />
            </InputContainer>
            <Button onClick={handleSubmit}>submit</Button>
            {error ? <Error>* {error}</Error> : <Empty />}
          </Container>
        </Centered>
      </UnAuthenticated>
    </Page>
  )
}
