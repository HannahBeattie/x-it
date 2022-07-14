import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export default function Blurb() {
  return (
    <Box marginLeft={'5rem'} marginRight={'5rem'}>
      <Accordion allowToggle={true}>
        <AccordionItem>
          <Box flex="1" textAlign="left" marginLeft={5} marginRight={5}>
            <AccordionButton>
              <Text>Tell me more</Text>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel pb={4}>
            X-it is a lightweight plug-in that allows users to vote ‘out’ of
            upcoming calendar events. The vote remains anonymous unless every
            attendee secretly votes ‘out’, in which case the event will be
            cancelled and all attendees notified.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
