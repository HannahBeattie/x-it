import { Box, Flex, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { motion, useTransform, useTime } from 'framer-motion'

function PhoneIm() {
  return (
    <Box minW={'4rem'}>
      <motion.div
        animate={{ rotate: [0, 2, 4, 6, 8, 10, 8, 6, 4, 2, 0, 2, 4, 6, 8, 12] }}
        transition={{ ease: 'linear', duration: 5, repeat: Infinity }}
      >
        <Image src="https://x-it.vercel.app/phone.png" alt="phone" />
      </motion.div>
    </Box>
  )
}

export default PhoneIm
