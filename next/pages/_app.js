import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../components/theme'
import { ColorModeScript } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
