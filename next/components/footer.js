import { Box, Flex, HStack, Link, Spacer, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import FramerTest from './FramerTest'

export default function Footer() {
  return (
    <>
      <Flex marginBottom={15}>
        <Box bg="#1A202C" w="100%">
          <HStack>
            <Spacer />
            <Box padding={9}>
              <FramerTest />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  )
}
