import { Box ,Button,Text} from '@chakra-ui/react'
import React from 'react'

function UserPill({user,handleFunction}) {
  return (
   <Box borderRadius={10} width={"auto"} display={"inline-block"} bg="#8C14D0" p={"5px 10px"} m={"2px 5px"}
   
   >
        <Text fontSize={"1em"}>
            {user.name}
            <Box bg="transparent" color={"#fff"} width={"auto"} height={"auto"} p={0} display={"inline"} ml="1" fontSize={"0.8em"} cursor={"pointer"}
            onClick={handleFunction}
            >
            <i className={"fa-solid fa-x"} />
            </Box>
        </Text>
   </Box>
  )
}

export default UserPill
