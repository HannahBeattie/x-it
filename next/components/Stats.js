import { Box, Heading, NumberInput } from '@chakra-ui/react'

export default function Stats({ numCancelled }) {
  console.log('numcanceelled is', numCancelled)

  return (
    <Box marginLeft={'5rem'} marginBottom={4}>
      <NumberInput fontSize="100">{numCancelled}</NumberInput>
      <Heading fontSize="lg">Cancelled meetings...and counting!</Heading>{' '}
    </Box>
  )
}
