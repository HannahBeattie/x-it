import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react'
import FramerTest from './FramerTest'
import { motion, useMotionValue } from 'framer-motion'
export default function Footer() {
  const x = useMotionValue(0)
  return (
    <>
      <Flex
        marginTop={0}
        alignItems="flex-end"
        paddingLeft={'3rem'}
        paddingRight={'3rem'}
      >
        <Box w="100%">
          <HStack>
            <motion.div whileTap={{ scale: 1.1 }} drag="x" style={{ x }}>
              <Link href="/author" size="md" my="2" color={'teal'}>
                click-me
              </Link>
            </motion.div>
            <Spacer />
            <Box paddingBottom={'3rem'}>
              <FramerTest />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  )
}
