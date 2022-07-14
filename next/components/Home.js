import { Box, Button, Image } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Box bg="#1A202C" w="100%" color="white">
        <Image
          h={14}
          padding={3}
          marginLeft={3}
          src="https://x-it.vercel.app/x-it-v2.png"
          alt="will go here"
        />
      </Box>
    </>
  )
}
