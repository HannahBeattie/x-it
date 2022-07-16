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

const emptyUser = { email: '', name: '' }

export default function Form() {
  // const [email, setEmail] = useState('')
  // const [name, setName] = useState('')
  const [betaUser, setBetaUser] = useState(emptyUser)

  const onChange = (evt) => {
    const user = { ...betaUser }
    user[evt.target.name] = evt.target.value
    setBetaUser(user)
  }

  async function submitHandler(evt) {
    evt.preventDefault()
    console.log('Adding beta user to fauna...', betaUser)
    const resp = await createBetaUser(betaUser)
    console.log('Added beta user to fauna, got response:', resp)
    setBetaUser(emptyUser)
  }

  return (
    <Box padding={10}>
      <ColorToggle />

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

      <Center>
        <Flex minWidth="max-content" gap="3" marginTop={10}>
          <Button
            colorScheme="teal"
            border="2px"
            borderColor={'teal'}
            variant="outline"
            size="lg"
            _hover={{ background: 'teal', color: 'white' }}
            alignSelf="stretch"
            onClick={submitHandler}
          >
            Submit
          </Button>

          <Button
            as="a"
            href="/"
            colorScheme="teal"
            border="2px"
            borderColor={'teal'}
            variant="outline"
            size="lg"
            _hover={{ background: 'teal', color: 'white' }}
            alignSelf="stretch"
          >
            Home
          </Button>
        </Flex>
      </Center>
    </Box>
  )
}
