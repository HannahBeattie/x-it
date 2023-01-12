import '../styles/globals.css'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import theme from '../components/theme'
import { ColorModeScript } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<VStack flex={'1'} alignItems={'stretch'} overflow={'hidden'}>
				<Component {...pageProps} />
			</VStack>
		</ChakraProvider>
	)
}

export default MyApp
