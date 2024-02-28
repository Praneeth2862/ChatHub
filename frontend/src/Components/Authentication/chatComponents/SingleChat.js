import React, { useEffect, useState } from 'react'
import { useChatContext } from '../../../Hooks/useChatContext'
import { Box ,Text,Image, FormControl,Input} from '@chakra-ui/react';
import { getSender, isSender } from '../../../config/ChatLogics';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;
function SingleChat({fetchAgain,setFetchAgain}) {
    const {user,selectedChat,setSelectedChat} = useChatContext();
    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [newMessage,setNewMessage] = useState();
    const [socketConnected,setSocketConnected] = useState(false);
    const fetchMessages = async() =>{
      if(!selectedChat) return;
      try{
        const config ={
          headers:{
            Authorization:`Bearer ${user.token}`,
          }
        }
        setLoading(true);
        const  { data } = await axios.get(`/api/message/${selectedChat._id}`,config);
        setMessages(data);
        setLoading(false);
        
        socket.emit("join chat",selectedChat._id);
      }catch(err){
          console.log(err);
      }
      
    }
    const sendMessage = async(event) =>{
        if(event && event.key=="Enter" && newMessage){
          try {
            const config = {
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user.token}`
              }
            }
            setNewMessage("")
            const { data } = await axios.post("/api/message",{
              content:newMessage,
              chatId:selectedChat._id
            },config)
            socket.emit("new message",data);
            setMessages([...messages,data]);
            
            
            
          } catch (error) {
            console.log(error)
          }
        }
    }
    const typingHandler = (e)=>{
      
      setNewMessage(e.target.value)
    }
    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup",user)
      socket.on('connection',()=>setSocketConnected(true))
    }, []);
    useEffect(()=>{
      selectedChatCompare = selectedChat;
      fetchMessages();

    },[selectedChat])
  
    useEffect(()=>{
      socket.on("message received",(newMessageReceived)=>{
        if(!selectedChatCompare || selectedChatCompare._id != newMessageReceived.chat._id){
          
        }else{
          setMessages([...messages,newMessageReceived]);
        }
      })
    })
  return (
    <Box w={"100%"} height="100%" color="#fff"  position={"relative"}>
        {
        !selectedChat?<Box width="100%" height="100%" display={"flex"} alignItems={"center"} justifyContent={"center"}>
            
            <Text display={{base:"none",md:"block"}} fontSize={"2em"}>Selected on chat to start chatting</Text>
            
        </Box>:(
            <Box display={"flex"} height="8vh"  alignItems={"center"} p={3} bg={"#332940"}  boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}  >
              <Box display={{base:"block",md:"none"}} p={3} fontSize={"1.5em"} cursor={"pointer"} onClick={()=>setSelectedChat(null)}><i className='fa-solid fa-arrow-left'/></Box>
              <Box w="100%"  bg="transparent" display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                {
                  !selectedChat.isGroupChat?(
                    <Box display={"flex"} alignItems={"center"}>
                      <Image src={getSender(user,selectedChat.users).pic} w={"50px"} height={"50px"} borderRadius={"50%"}/>
                      <Text ml={2} fontSize={"1.5em"}>{getSender(user,selectedChat.users).name}</Text>
                    </Box>
                  ):(
                    <Box display={"flex"} alignItems={"center"}>
                      <Text fontSize={"1.5em"} mr={3}><i className='fa-solid fa-user-group'/></Text>
                      <Text fontSize={"1.5em"}>{selectedChat.chatName}</Text>
                    </Box>
                  )
                }
                <Box fontSize={"2em"} cursor={"pointer"}><i className='fa-solid fa-eye'/></Box>
              </Box>
            </Box>
        )
}
        <Box width={"100%"} height={"63vh"} overflowY={"scroll"}  >
            {
              loading?<Spinner size="xl" w={20} h={20}  margin={"auto"} position="absolute" top={"50%"} left="50%"/>:(
                  <Box width={"100%"} >
                    {
                      messages.map((message)=>(
                        <Box display={"flex"} width={"100%"} justifyContent={isSender(user,message)?"flex-end":"flex-start"}
                        p={2}>
                          <Text
                          borderRadius={20}
                          p={3}
                          bg={isSender(user,message)?"green":"blue"}
                        >{message.content}</Text>
                        </Box>
                      ))
                    }
                    
                    
                  </Box>
              )
            }
        </Box>
        <Box position={"absolute"} bottom={"3"} width={"100%"} >
          <FormControl onKeyDown={(event)=>sendMessage(event)} isRequired mt={3} >
            <Input type="text" placeholder='Enter message Here' onChange={typingHandler} value={newMessage}/>
          </FormControl>
        </Box>
        
    </Box>
  )
}

export default SingleChat
