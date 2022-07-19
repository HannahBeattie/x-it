import { Box, Center } from '@chakra-ui/react'

export default function Example() {
  return (
    <Center>
      <Box width={'50rem'}>
        <video
          as="video"
          alt="promo video"
          muted
          autoPlay="true"
          controls={false}
          preload="auto"
          loop="true"
          paused="false"
        >
          <source src="/eg.mp4" type="video/mp4" />
          {`Your browser doesn't support HTML5 video tag.`}
        </video>
      </Box>
    </Center>
  )
}
