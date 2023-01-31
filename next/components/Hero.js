import { Button, Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import Video from './Video'

export default function Hero() {
	return (
		<Container maxW={'7xl'} px='12'>
			<Stack
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 8, md: 28 }}
				direction={{ base: 'column', md: 'row' }}
			>
				<Stack flex={1} spacing={{ base: 5, md: 10 }}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
					>
						<Text
							as={'span'}
							position={'relative'}
							_after={{
								content: "''",
								width: 'full',
								height: '30%',
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'teal.400',
								zIndex: -1,
							}}
						>
							X-it
						</Text>

						<br />
						<Text as={'span'} color={'teal'}>
							Your exit strategy for unwanted engagements
						</Text>
					</Heading>
					<Text color={'gray.500'}>
						Discreetly vote to cancel unwanted meetings from your calendar
					</Text>
					<Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
						<Button
							as='a'
							href='/email'
							colorScheme='teal'
							border='2px'
							borderColor={'teal'}
							variant='outline'
							size='lg'
							_hover={{ background: 'teal', color: 'white' }}
							w={{ base: '100%', md: 'initial' }}
						>
							Join X-it Beta
						</Button>
					</Stack>
				</Stack>

				<VStack
					position={'relative'}
					borderRadius='lg'
					boxShadow={'2xl'}
					overflow={'hidden'}
				>
					<Video />
				</VStack>
			</Stack>
		</Container>
	)
}
