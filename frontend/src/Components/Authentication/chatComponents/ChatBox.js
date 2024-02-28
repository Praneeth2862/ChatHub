import React from 'react'
import { Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useChatContext } from '../../../Hooks/useChatContext'
import SingleChat from './SingleChat';
export default function ChatBox({fetchAgain}) {
  const {selectedChat} = useChatContext();
  return (
    <Box  
    width={{base:selectedChat?"100%":"none",md:"70vw"}}
    height={"82vh"}  bg={"#2f2b3a"} borderRadius={"10px"}>
      {

        <SingleChat/>

      }

    </Box>
  )
}
