import { Container, Heading, Tag, Text } from '@chakra-ui/react'
import { motion, useMotionValue } from 'framer-motion'
import PhoneIm from './PhoneIm'

export default function FramerTest() {
  const x = useMotionValue(0)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <motion.div whileTap={{ scale: 1.1 }} drag="x" style={{ x }}>
        <Heading
          onClick={scrollToTop}
          cursor="pointer"
          transformOrigin="11px"
          width="10"
          height="10"
          display="flex"
        >
          <PhoneIm />
        </Heading>
      </motion.div>
    </Container>
  )
}
