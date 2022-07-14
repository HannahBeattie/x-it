import {
  Button,
  DarkMode,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
} from '@chakra-ui/react'
import theme from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ColorToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      isRound
      size="sm"
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={() => {
        toggleColorMode()
      }}
    />
  )
}
