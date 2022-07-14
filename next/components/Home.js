import { Box } from '@chakra-ui/react'
import Banner from './Banner'
import ColorToggle from './ColorToggle'
import Header from './Header'

export default function Home() {
  return (
    <>
      <Header />
      <Box margin={5}>
        <ColorToggle />
      </Box>
      <Banner />
    </>
  )
}
