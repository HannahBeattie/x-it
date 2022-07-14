import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'
import ColorToggle from './ColorToggle'

export default function Header() {
  return (
    <>
      <Flex>
        <Box bg="#1A202C" w="100%">
          <HStack>
            <Image
              h={20}
              padding={3}
              marginLeft={{ base: 2, md: 2, lg: 3 }}
              src="https://x-it.vercel.app/X-it.png"
              alt="green X logo"
            />
            <Spacer />

            <Text as="i" color="white" padding={7}>
              your x-it strategy for unwanted engagements
            </Text>
          </HStack>
        </Box>
      </Flex>
      <Box margin={5}>
        <ColorToggle />
      </Box>
    </>
  )
}
