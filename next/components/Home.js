import { Box } from '@chakra-ui/react'
import Hero from './Hero'
import Header from './Header'
import Blurb from './Blurb'
import Stats from './Stats'

export default function Home() {
  return (
    <>
      <Header />
      <Box margin={5}></Box>
      <Hero />
      <Stats />
      <Blurb />

      {/* <FramerTest /> */}
    </>
  )
}
