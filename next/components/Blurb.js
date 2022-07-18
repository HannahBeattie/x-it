import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export default function Blurb() {
  return (
    <Box mx="12" my="20">
      <Accordion allowToggle={true} outlineColor={'#38B2AC'}>
        <AccordionItem>
          <Box flex="1" textAlign="left">
            <AccordionButton>
              <Text> About X-it</Text> <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel pb={4}>
            <Container>
              <Text pb="8">
                X-it is a lightweight plug-in that allows users to vote ‘out’ of
                upcoming calendar events. The vote remains anonymous unless
                every attendee secretly votes ‘out’, in which case the event
                will be cancelled and all attendees notified.
              </Text>
            </Container>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
