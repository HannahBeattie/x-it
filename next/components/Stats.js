import { Box, Center, Heading, HStack, NumberInput } from '@chakra-ui/react'

export default function Stats({ numCancelled }) {
  console.log('numcanceelled is', numCancelled)

  return (
    <Center>
      <HStack marginTop={0} padding={5}>
        <Heading fontSize={100}>{numCancelled} </Heading>
        <Heading> meetings cancelled, and counting!</Heading>
      </HStack>
    </Center>
  )
}
