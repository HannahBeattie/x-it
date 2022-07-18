import { Box, Flex, HStack, Image, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import ColorToggle from './ColorToggle'

export default function Header() {
  return (
    <>
      <Flex>
        <Box bg="#1A202C" w="100%">
          <HStack>
            <Link href="/">
              <a>
                <Image
                  h={20}
                  padding={3}
                  marginLeft={{ base: 2, md: 2, lg: 3 }}
                  src="https://x-it.vercel.app/X-it.png"
                  alt="green X logo"
                />
              </a>
            </Link>

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
