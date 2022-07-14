import {
  Box,
  Center,
  Flex,
  Heading,
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
            <Box padding={5}>
              <ColorToggle />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  )
}
