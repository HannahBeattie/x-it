import React from 'react'
import MyBanner from './AuBanner'
import {
  Box,
  Text,
  Flex,
  Image,
  Grid,
  GridItem,
  Heading,
  Link,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Header from './Header'

export default function Author() {
  return (
    <>
      <Header />
      <Box padding={'3rem'}>
        <Grid templateColumns="repeat(3,  1fr)" gap={4}>
          <GridItem>
            <Heading marginBottom={'2rem'}>Hello</Heading>
            <Text>
              My name is Hannah and I am a junior Dev.
              <br />
              <br />
              This site is currently under construction, but feel free to check
              out my{' '}
              <Link color="teal.500" href="https://hannahbeattie.github.io/">
                Blog.
              </Link>
              <br />
              <br />
              It was created during my first six weeks at{' '}
              <Link color="teal.500" href="https://handbook.eda.nz/foundations">
                Dev Acadamy.
              </Link>
            </Text>
          </GridItem>
          <GridItem>
            <Box>
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{
                  y: [0, 500],
                  x: [0, 30],
                  rotate: [0, 360],
                }}
                transition={{
                  ease: 'linear',
                  times: [0, 0.45, 0.6, 0.61, 1],
                  repeat: Infinity,
                  duration: 100,
                }}
              >
                <Image src="/rock.png" alt="logo" />
              </motion.div>
            </Box>
          </GridItem>

          <GridItem marginTop={'10rem'}>
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ ease: 'linear', duration: 300, repeat: Infinity }}
            >
              <Image height={'4rem'} src="/const.jpg" alt="logo" />
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ ease: 'linear', duration: 150, repeat: Infinity }}
            >
              <Image src="/rock.png" alt="logo" />
            </motion.div>
          </GridItem>
          <GridItem>
            <Box>
              <motion.div
                initial={{ x: 800, y: 0 }}
                animate={{
                  x: [0, 1000],
                  y: [0, 1, 100, 200, 100],
                  rotate: [0, 360],
                }}
                transition={{
                  ease: 'linear',
                  times: [0, 0.45, 0.6, 0.61, 1],
                  repeat: Infinity,
                  duration: 100,
                }}
              >
                <Image src="/rock.png" alt="logo" />
              </motion.div>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
