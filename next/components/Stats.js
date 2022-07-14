import {
  Box,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { countCancelled } from '../lib/fauna'

export async function getServerSideProps() {
  const numCancelled = await countCancelled()
  return { props: { numCancelled } }
}

export default function Stats({ numCancelled }) {
  console.log(
    'countCancelled is:',
    countCancelled(),
    'numcanceelled is',
    numCancelled
  )

  return (
    <Stat>
      <StatLabel>Meetings Cancelled</StatLabel>
      <StatNumber>{numCancelled}</StatNumber>

      <StatArrow type="increase" />
    </Stat>
  )
}
