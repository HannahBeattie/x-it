import { Box } from '@chakra-ui/react'
import Hero from './Hero'
import Header from './Header'
import Blurb from './Blurb'
import Stats from './Stats'
import Footer from './footer'
// import Footer from './footer'

export default function Home({ numCancelled }) {
  return (
    <>
      <Header />
      <Box margin={5}></Box>
      <Hero />
      <Stats from={0} to={numCancelled} />
      <Blurb />
      <Footer />
    </>
  )
}
