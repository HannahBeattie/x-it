import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  LinkBox,
  SimpleGrid,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ColorToggle from './ColorToggle'
import { createBetaUser, getCalEvent } from '../lib/fauna'
import Header from './Header'

const emptyUser = { email: '', name: '' }

export default function Form() {
  const [betaUser, setBetaUser] = useState(emptyUser)
  const [submitting, setSubmitting] = useState(false)

  const onChange = (evt) => {
    const user = { ...betaUser }
    user[evt.target.name] = evt.target.value
    setBetaUser(user)
  }

  async function submitHandler(evt) {
    evt.preventDefault()
    setSubmitting(true)
    console.log('Adding beta user to fauna...', betaUser)
    // const resp = await createBetaUser(betaUser)
    const resp = await fetch('/api/beta', {
      method: 'POST',
      body: JSON.stringify(betaUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const respJson = await resp.json()
    console.log('Added beta user to fauna, got response:', respJson)
    setBetaUser(emptyUser)
    setSubmitting(false)
  }

  return (
    <Box>
      <Header />
      {/* <Box bg="gray.700" p="8" mt="8">
        <pre>betaUser = {JSON.stringify(betaUser, null, '    ')}</pre>
      </Box> */}

      <center>
        <Heading size={'xl'} color="#319795" paddingTop={20} paddingBottom={8}>
          Join the X-it Beta waitlist
        </Heading>

        <Box maxWidth={'30rem'}>
          <form onSubmit={submitHandler}>
            <FormControl isRequired mt={6}>
              <FormLabel color={'grey'}>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={betaUser.name}
                placeholder="What should I call you?"
                size="lg"
                colorScheme="teal"
                variant="filled"
                borderColor={'teal'}
                onChange={onChange}
              />
            </FormControl>
            <Box marginTop={37}> </Box>
            <FormControl isRequired>
              <FormLabel color={'grey'}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={betaUser.email}
                placeholder="example@email.com"
                size="lg"
                variant="filled"
                colorScheme="teal"
                borderColor={'teal'}
                onChange={onChange}
              />
            </FormControl>
          </form>
        </Box>
      </center>

      <VStack>
        <Flex minWidth="max-content" gap="3" marginTop={10}>
          <Button
            colorScheme="teal"
            border="2px"
            borderColor={'teal'}
            variant="outline"
            size="lg"
            _hover={{ background: 'teal', color: 'white' }}
            alignSelf="stretch"
            type="submit"
            onClick={submitHandler}
            isLoading={submitting}
            loadingText="Taste freedom"
            disabled={submitting}
          >
            Yes please!
          </Button>
        </Flex>
      </VStack>
    </Box>
  )
}
