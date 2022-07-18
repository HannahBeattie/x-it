import { Box, Center, Heading, HStack, NumberInput } from '@chakra-ui/react'
import FramerTest from './FramerTest'
import { animate, motion } from 'framer-motion'
import React, { useCallback, useEffect } from 'react'
import { useRef } from 'react'

export default function Stats({ from, to }) {
  const nodeRef = useRef()

  const triggerAnim = useCallback(() => {
    const node = nodeRef.current
    if (node.alreadyTriggered) {
      return
    }
    node.alreadyTriggered = true
    const controls = animate(from, to, {
      duration: 3,
      onUpdate(value) {
        node.textContent = value.toFixed(0)
      },
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [from, to])

  return (
    <Box>
      <Center>
        <HStack marginTop={0} padding={5} alignItems="flex-end">
          <Heading fontSize={100} minW="52" textAlign="right">
            <motion.div onViewportEnter={triggerAnim} ref={nodeRef}>
              {' '}
            </motion.div>
          </Heading>
          <Heading pl="4" pb="4" pr="32">
            {' '}
            meetings cancelled, and counting!
          </Heading>
        </HStack>
      </Center>
    </Box>
  )
}
