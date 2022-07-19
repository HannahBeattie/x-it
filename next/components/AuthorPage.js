import { Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { test4 } from '../public/test4.png'

export default function AuthorPage() {
  const animationKeyframes = keyframes`
    0% { transform: scale(1) rotate(0deg);}
    50% { transform: scale(2) rotate(150deg);}
    75% { transform: scale(1) rotate(300deg);}
    100% { transform: scale(1) rotate(360deg);}
  `
  const animation = `${animationKeyframes} infinite 10s linear`

  return (
    <div className="App">
      <header className="App-header">
        <Image
          src={test4}
          className="App-logo"
          alt="logo"
          animation={animation}
        />
      </header>
    </div>
  )
}

// return (
//   <Container display="flex" alignItems="center" justifyContent="center">
//     <Heading
//       onClick={scrollToTop}
//       cursor="pointer"
//       animation={animation}
//       transformOrigin="11px"
//       width="10"
