import { Box, Circle, Container, Heading, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function FramerTest() {
  const animationKeyframes = keyframes`
   0% { transform: scale(1) rotate(0deg);}
  50% { transform: scale(2) rotate(150deg);}
  75% { transform: scale(1)  rotate(300deg);}
  100% { transform: scale(1)  rotate(360deg);}

 `
  const animation = `${animationKeyframes}   infinite 10s linear`

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <Heading
        as={motion.div}
        animation={animation}
        width="10"
        height="10"
        display="flex"
      >
        X
      </Heading>
    </Container>
  )
}
