import { Box, Flex, HStack, Spacer, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <>
      <Flex>
        <Box bg="#1A202C" w="100%">
          <HStack>
            <Text>Hello</Text>
            <Spacer />
            <Box padding={5}>
              <Text>Hi</Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  )
}
