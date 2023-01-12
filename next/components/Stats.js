import { Box, Center, Heading, HStack, NumberInput, VStack } from '@chakra-ui/react'
import FramerTest from './FramerTest'
import { animate, motion } from 'framer-motion'
import React, { useCallback, useEffect } from 'react'
import { useRef } from 'react'
import PhoneIm from './PhoneIm'

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
		<VStack p={8}>
			<HStack>
				<Heading fontSize={{ md: 100, base: 70 }}>
					<motion.div onViewportEnter={triggerAnim} ref={nodeRef} />
				</Heading>
				<Heading textAlign={{ md: 'right', base: 'center' }}>
					meetings cancelled, and counting!
				</Heading>
			</HStack>
		</VStack>
	)
}
