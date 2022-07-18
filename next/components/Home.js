import { Box } from '@chakra-ui/react'
import Hero from './Hero'
import Header from './Header'
import Blurb from './Blurb'
import Stats from './Stats'
import Counter from './Count'

export default function Home({ numCancelled }) {
  return (
    <>
      <Header />
      <Box margin={5}></Box>
      <Hero />
      {/* <Stats numCancelled={numCancelled} /> */}
      <Stats from={0} to={numCancelled} />
      <Blurb />
      {/* <Counter from={0} to={numCancelled} /> */}
    </>
  )
}
