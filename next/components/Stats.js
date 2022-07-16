import { Box, Stat, StatArrow, StatLabel, StatNumber } from '@chakra-ui/react'

export default function Stats({ numCancelled }) {
  console.log('numcanceelled is', numCancelled)

  return (
    <Box marginLeft={'5rem'}>
      <Stat>
        <StatLabel>Cancelled meetings</StatLabel>
        <StatNumber>{numCancelled}</StatNumber>

        <StatArrow type="increase" />
      </Stat>
    </Box>
  )
}
