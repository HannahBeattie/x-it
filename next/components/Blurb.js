import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Divider,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import Example from './Example'

export default function Blurb() {
  return (
    <Box mx="12" my="20">
      <Divider />
      <Container marginBottom={5}>
        <Text fontSize="lg" py="8">
          X-it is a lightweight plug-in that allows users to vote ‘out’ of
          upcoming calendar events. The vote remains anonymous unless every
          attendee secretly votes ‘out’, in which case the event will be
          cancelled and all attendees notified.
        </Text>
      </Container>
      <Divider />
      <Box marginTop={20}>
        <Example />
      </Box>
    </Box>
  )
}
