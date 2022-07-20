import { Container, Heading } from '@chakra-ui/react'
import { motion, useMotionValue } from 'framer-motion'
import PhoneIm from './PhoneIm'

export default function FramerTest() {
  const x = useMotionValue(0)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    })
  }

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <motion.div whileTap={{ scale: 1.2 }} drag="x" style={{ x }}>
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

// const animationKeyframes = keyframes`
//   0% { transform: scale(1) rotate(0deg);}
//   50% { transform: scale(2) rotate(150deg);}
//   75% { transform: scale(1) rotate(300deg);}
//   100% { transform: scale(1) rotate(360deg);}
// `
// const animation = `${animationKeyframes} infinite 10s linear`

// This function will scroll the window to the top
