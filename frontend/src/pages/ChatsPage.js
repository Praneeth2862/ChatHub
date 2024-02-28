import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useChatContext } from '../Hooks/useChatContext';
import { Box,Text } from '@chakra-ui/react';
import SideDrawer from '../Components/Authentication/chatComponents/SideDrawer';
import NavBar from '../Components/Authentication/chatComponents/NavBar';
import ChatBox from '../Components/Authentication/chatComponents/ChatBox';

const ChatsPage = () => {
  const {user} = useChatContext();
  const [fetchAgain,setFetchAgain] = useState();
  return (
    <div className="chat-page" style={{width:"100%"}}>
      <Box position='absolute'
      top="0"
      width="100%"
      height="10vh"
      >
      {
       user && <NavBar/>
      }
      </Box>
      {
        user && <Box
        position={"absolute"} display={"flex"} flexDirection={"row"}
        justifyContent={"space-around"}
        top={"10vh"}
        p={5}
        w={"100%"}
        h={"90vh"}
       >
        {/* <Text color="#fff" fontSize={"2xl"}>{user.email}{user.token}{user.name}</Text> */}
        <SideDrawer fetchAgain={fetchAgain}/> 
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </Box>
      }
    </div>
  )
}

export default ChatsPage;
