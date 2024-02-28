import React from 'react'
import { Box,Avatar,Text } from '@chakra-ui/react'
function ChatListItem({handleFunction,user}) {
  return (
    <Box display={'flex'} alignItems={'center'} 
        cursor={'pointer'}
        h={'70px'} w={'100%'}  borderRadius={'10px'} bg={'#1a1625'} mb={2} p={1} boxSizing='border-box'
        _hover={{bg:"#8C14D0"} 
      }
      onClick={handleFunction}
        >
        <Avatar  ml={2} size={'sm'} cursor={"pointer"} name='Praneeth Isaac' src={user.pic}/>
        <Box >
        <Text fontSize={'xl'} fontWeight={'bold'} color={'#fff'} ml={2}>{user.name}</Text>
        <Text fontSize={'md'} fontWeight={'bold'} color={'rgba(255,255,255,0.4)'} ml={2}>{user.email}</Text>
        </Box>
    </Box>
  )
}

export default ChatListItem
