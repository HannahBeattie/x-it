import { Image } from '@chakra-ui/react'
import React from 'react'
import phone from '../public/phone.png'

function PhoneIm() {
  return (
    <Image
      h={20}
      padding={3}
      marginLeft={{ base: 2, md: 2, lg: 3 }}
      alt="phone"
      src="../public/phone.png"
      maxHeight={'20rem'}
    />
  )
}

export default PhoneIm
