import { Box, Flex, HStack, Image, Spacer } from '@chakra-ui/react'
import { motion, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import ColorToggle from './ColorToggle'

export default function Header() {
  const x = useMotionValue(0)

  return (
    <Flex>
      <Box bg="#1A202C" w="100%">
        <HStack>
          <motion.div whileTap={{ scale: 1.2 }} drag="x" style={{ x }}>
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
          </motion.div>
          <Spacer />
          <Box padding={5}>
            <ColorToggle />
          </Box>
        </HStack>
      </Box>
    </Flex>
  )
}
