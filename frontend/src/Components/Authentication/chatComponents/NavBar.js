import React, { useEffect, useState } from 'react'
import { Box ,Text,Button, Tooltip, Avatar,Menu,MenuButton,MenuList,MenuItem, InputGroup, InputLeftElement,Input, InputRightElement, Toast} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import ProfileModal from '../../extra/ProfileModal'
import { useChatContext } from '../../../Hooks/useChatContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import SearchLoader from '../../extra/SearchLoader'
import axios from 'axios'
import ChatListItem from './ChatListItem'
function NavBar() {
  const [search,setSearch] = useState()
  const [result,setResult] = useState()
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const {user,setSelectedChat,chats,setChats,setUser} = useChatContext();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  function logoutHandler(){
    localStorage.removeItem("userInfo");
    setUser({});
    history.push("/");
  }
  async function searchHandler(){
    if(!search){
      toast({
        title:"Empty Search",
        status:"warning",
        duration:2000,
        isClosable:true,
        position:"top-right"
      })
      return;
    }
    try{
      setLoading(true);
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`/api/user?search=${search}`,config);
      console.log(data);
      setResult(data);
      setLoading(false);
    }catch(err){

    }
    
  }
  async function accessChat(userId){
    try{
      setLoadingChat(true);
      const config = {
        headers:{
          "Content-type" : "application/json",
          Authorization:`Bearer ${user.token}`
        },
      };
      const {data} = await axios.post("/api/chat",{ userId },config);
      if(!chats.find((c) => c._id === data._id))
      {
        setChats([data,...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false)
      onClose();
    }catch(err){
      console.log("error loading Chat")
    }
  }
  return (
    <Box
    display="flex"
    alignItems={"center"}
    pl={10}
    pr={10}
    justifyContent={"space-between"}
        bg="#2f2b3a"
        h="10vh"
        w="100%"
    >
      <Box>

          <Text 
          textAlign={"center"}
          fontSize="1.8em"
          fontWeight="Bolder"
          color="#ffffff"
          width="200px">
            <i className="fa-brands fa-rocketchat"/>
            Chat-Hub
          </Text>
        </Box>
        <Box width="auto" display={"flex"} alignItems={"center"}>
        <Tooltip label={"Search Users to Chat"} hasArrow placement='bottom-end'>
          <Button variant='outline' color={"#ffffff"}_hover={{color:"#000",background:"#fff"}} onClick={onOpen}>
          <i className="fa fa-search" aria-hidden="true"/>
            <Text ml={2} display={{base:"none",md:"flex"}}>Search User</Text>
            </Button>
        </Tooltip>
          <Button variant={"outline"} color={"#fff"} _hover={{bg:"#fff",color:"#000"}} ml={5}>
          <i className="fa-solid fa-bell " aria-hidden="true"/>
            <Text ml={2} display={{base:"none",md:"flex"}}>Notification</Text>
          </Button>
          <Menu>
            <MenuButton  >
            <Avatar ml={2} size={'md'} cursor={"pointer"} name='Praneeth Isaac' src={user.pic}/>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <ProfileModal text={true} user={user}/>
              </MenuItem>
              <MenuItem>
                    <Box bg={"transparent"} fontWeight={"bold"} p={3}
                    onClick={logoutHandler} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                      <i className="fa-solid fa-power-off"></i>
                      <Text>Logout</Text>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={'#2f2b3a'}>
          <DrawerCloseButton color={"#fff"}/>
          <DrawerHeader ><Text color={'#fff'}>Search Users</Text></DrawerHeader>

          <DrawerBody >
            <Box width="100%" height="80vh" display={"flex"} alignItems={"center"} gap={20} flexDirection={"column"}>
              <Box width="100%">
                <InputGroup width="100%">
                  <InputLeftElement width="80%">
                    <Input type="text" width={"100%"} placeholder='Search users..' color={'#fff'} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  </InputLeftElement>
                  <InputRightElement width="20%">
                    <Button width="100%" onClick={searchHandler}>Go</Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
                <Box width={"100%"} overflowY={'auto'}>
                  {
                    loading?<SearchLoader/>:
                  result
                  ?result.map((user,index)=>(
                    <ChatListItem key={user._id} user={user} handleFunction = {()=>accessChat(user._id)}/>
                  ))
                  :<Text color="#fff">Search username or email and hit Go</Text>
                  
                }
                </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    </Box>
  )
}

export default NavBar
