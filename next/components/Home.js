import { Box } from '@chakra-ui/react'
import Hero from './Hero'
import ColorToggle from './ColorToggle'
import Header from './Header'
import Blurb from './Blurb'

export async function getServerSideProps() {
  const numCancelled = await countCancelled()
  return { props: { numCancelled } }
}

export default function Home() {
  return (
    <>
      <Header />
      <Box margin={5}></Box>
      <Hero />
      <Blurb />
      {/* <FramerTest /> */}
    </>
  )
}
