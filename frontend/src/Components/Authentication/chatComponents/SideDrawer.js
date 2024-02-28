import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Box,Text,useToast,Button, Avatar } from '@chakra-ui/react'
import { useChatContext } from '../../../Hooks/useChatContext';
import { getSender } from '../../../config/ChatLogics';
import GroupChatModal from '../../extra/GroupChatModal';
import SearchLoader from '../../extra/SearchLoader';
export default function SideDrawer({fetchAgain}) {
  const {user,selectedChat,setSelectedChat,chats,setChats} = useChatContext();
  const [isLoading,setLoading] = useState(false);
  const [loggeduser,setLoggedUser] = useState();
  const toast = useToast();
 async function fetchChats(){
  try{
     console.log(user)
    if(!user){
      console.log("No usser")
    }
    const config= {
      headers:{
        Authorization:`Bearer ${user.token}`,
      },
    };
    setLoading(true);
    const {data} = await axios.get("/api/chat",config);
    
    setChats(data);
    setLoading(false);
  }
  catch(err){
    console.log(`Error:${err}`);
    toast({
      title:"Error Loading Chats",
      description:"err",
      status:"error",
      duration:4000,
      isClosable:true,
      position:"bottom-left"
    })
  }
 }
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  },[])
  useEffect(()=>{
    
      fetchChats();
  },[fetchAgain]);
  return (

    isLoading ? <SearchLoader/>
    :
    (
      <Box
      display={{base:selectedChat?"none":"block",md:"block"}}
      height={"75vh"}
      w={{base:"100%",md:"20vw"}}
      borderTopRadius={"10px"}
      >
        <Text bg={"#2f2b3a"} fontSize={"2xl"} h={"50px"} color={"#fff"} fontWeight={"bold"} border={"2px #1a1625"} display={"flex"} alignItems={"center"} justifyContent={"center"} borderTopRadius={"10px"}>All Chats</Text>
        <Box h={"100%"} bg={"#2f2b3a"} p={5} borderBottomRadius={"10px"} overflowY={"scroll"} >
        <GroupChatModal>
            <Button w="100%" h="40px" bg="#610C9F" color="#fff" mb={3} mr={5}
            _hover={{bg:"#8C14D0"}}
            > Create Group 
            <Text ml={2}>
            <i className="fa-solid fa-plus"></i>
            </Text>
            </Button>
        </GroupChatModal>
         <Box height={"100%"} >
            {
               
              chats.map((chat,index)=>(
                <Box w={"100%"} h={"50px"}  mb={2} borderRadius={"10px"} onClick={()=>setSelectedChat(chat)} 
                bg={ chat ===selectedChat?"#8C14D0":"rgba(26,22,37,0.5)"}
                cursor={"pointer"}
                color={"#fff"}
                key={chat._id}
                >
                    <Box  alignItems={"center"} height={"50px"}>
                      {
                        !chat.isGroupChat?(
                          <Box display={"flex"} alignItems={"center"} gap={5} height={"100%"} p={5}>
                            <Avatar src={getSender(loggeduser,chat.users).pic} size={"sm"}/>
                            <Box>
                              <Text fontSize={"xl"}>{getSender(loggeduser,chat.users).name}</Text>
                              <Text fontSize={"sm"} color="rgba(255,255,255,0.5)">
                                {chat.latestMessage.content}</Text>
                            </Box>
                          </Box>
                        ):(<Text fontSize={"xl"}>{chat.chatName}</Text>)
                      }
                    </Box>
                </Box>
              ))
              }
         </Box>
        </Box>
      </Box>

    )
        
    
  )
}
