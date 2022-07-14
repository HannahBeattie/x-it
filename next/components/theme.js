// theme.js

// 1. import `extendTheme` function
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme
