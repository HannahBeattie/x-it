import { HStack, Image, Spacer } from '@chakra-ui/react'
import { motion, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import ColorToggle from './ColorToggle'

export default function Header() {
	const x = useMotionValue(0)

	return (
		<HStack>
			<HStack p={4} flex={'1'}>
				<motion.div whileTap={{ scale: 1.2 }} drag='x' style={{ x }}>
					<Link href='/'>
						<a>
							<Image
								h={10}
								src='https://x-it.vercel.app/X-it.png'
								alt='green X logo'
							/>
						</a>
					</Link>
				</motion.div>
				<Spacer />
				<ColorToggle />
			</HStack>
		</HStack>
	)
}
