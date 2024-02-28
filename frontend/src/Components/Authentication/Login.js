import React, { useState } from 'react'
import {FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button,useToast} from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const toast = useToast()
    const history = useHistory();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const submitHandler = async ()=>{
        setLoading(true);
    if ( !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user/login",
          {
            email,
            password,
          },
          config
        );
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      }catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }
  return (
    <VStack spacing={"10px"}>
        <FormControl spacing={"20px"}>
            <FormLabel>Email:</FormLabel>
            <Input placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} isRequired/>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
            <Input placeholder='Enter your password' type={show?"text":"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} isRequired/>
            <InputRightElement>
                <Button fontSize={"12px"} onClick={()=>{setShow(!show)}}>
                    {
                        show?<p>hide</p>:<p>show</p>
                    }
                </Button>
            </InputRightElement>
            
            </InputGroup>
            <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login 
      </Button>
        </FormControl>
    </VStack>
  )
}

export default Login
