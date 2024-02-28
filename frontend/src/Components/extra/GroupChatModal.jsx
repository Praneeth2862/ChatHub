import React,{useState} from 'react'
import axios  from 'axios'
import { useDisclosure,Box,Modal,useToast,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,ModalCloseButton,FormControl, Input, Center } from '@chakra-ui/react'
import { useChatContext } from '../../Hooks/useChatContext'
import ChatListItem from '../Authentication/chatComponents/ChatListItem'
import UserPill from './UserPill'
function GroupChatModal({children}) {
    const {isOpen,onClose,onOpen} = useDisclosure()
    const [groupChatName,setGroupChatName] = useState()
    const[selectedUsers,setSelectedUsers] = useState([])
    const[search,setSearch] = useState()
    const [searchresult,setSearchResult] = useState()
    const [loading,setLoading] = useState(false);

    const toast = useToast();

    const {user,chats,setChats} = useChatContext();
    const handleGroup = (userToAdd) =>{
      console.log("handle clicks")
      if(!selectedUsers.includes(userToAdd)){
        setSelectedUsers([...selectedUsers,userToAdd]);
      }
    }
    const handleSearch = async (query)=>{
      setSearch(query);
      if(!query){
        return;
      }
      try{
        setLoading(true);
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        }
        const { data } = await axios.get(`/api/user?search=${search}`,config)
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      }
      catch(err){
          console.log("error handle Search");
      }
    }
    const deletePill = (userToDelete) =>{
        const updatedSelectedUsers = selectedUsers.filter((user)=>user!=userToDelete);
        setSelectedUsers(updatedSelectedUsers);
        
    }
    const handleSubmit = async()=>{
      if(selectedUsers.length <2 || !groupChatName){
        toast({
          title:"Please fill all required Fields",
          description:"Please fill title and add atleast 2 users",
          status:"warning",
          duration:"3000",
          isClosable:true,
          position:"bottom"
        })
        return;
      }
      try{
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`,
          }
        }
        const { data } = await axios.post("/api/chat/group",{
          users:JSON.stringify(selectedUsers.map(u=>u._id)),
          name:groupChatName
        },config)
        console.log(data);
        toast({
          title:"Group Successfully Deleted",
          status:"success",
          duration:"3000",
          isClosable:true,
          position:"bottom"
        })
        setChats([...data,chats]);
        onClose();
      }
      catch(err){
        toast({
          title:"Can't Create Group",
          description:"error while creating group",
          status:"error",
          duration:"3000",
          isClosable:true,
          position:"bottom"
        })
      }
    }
  return (
    <Box >
      <span onClick={onOpen}> {children}  </span>
      <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent bg={"#2f2b3a"} color={"#fff"}>
          <ModalHeader display={"flex"} alignItems={"center"} justifyContent={"center"}>Create GroupChat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"} >
            <FormControl>
              <Input
              mb={5}
                
                placeHolder='Group Name'
                onChange={(e)=>setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input mb={5}
                placeHolder='Add users here'
                onChange={(e)=>handleSearch(e.target.value)}
              />
            </FormControl>
            <Box>
             {
              selectedUsers.map((user)=><UserPill user={user} key={user._id} handleFunction={()=>deletePill(user)}/>)
             }
            </Box>
            <Box w={"100%"} overflowY={"scroll"} maxHeight={"300px"} border={"none"} >
            {
              loading?<p>Loading users</p>:(
                searchresult?.map(user =><ChatListItem user={user} key={user._id} handleFunction={()=>handleGroup(user)}/>)
              )
            }
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} color="#fff" mr={3} onClick={onClose} _hover={{bg:"transparent"}}>
              Cancel
            </Button>
            <Button bg="#8C14D0" color={"#fff"} _hover={{bg:"#1a1625"}} onClick={handleSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default GroupChatModal
