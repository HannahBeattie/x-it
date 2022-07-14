// theme.js

// 1. import `extendTheme` function
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light' | 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme(
  config,
  withDefaultColorScheme({ colorScheme: 'gray' })
)

export default theme
