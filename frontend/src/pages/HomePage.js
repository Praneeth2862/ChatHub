import React, { useEffect } from 'react'
import {Box, Container,Text,Tabs,TabList,Tab,TabPanel,TabPanels} from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import '../App.css';
const HomePage = () => {
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      history.push("/chats");
    }
  },[history])
  return (
    <div className="home">
      <Container maxW='xl'  bg='white' borderWidth={'2px'} borderRadius={'lg'} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}>
      <Box color='red'
      d='flex'
      alignItems='center'
      justifyContent='center'
      fontSize='x-large'
      p={5}
      >
        <Text fontSize={'1.3em'} textAlign={'center'}>
          Chit-Chat
        </Text>
        <Tabs variant='enclosed' m={'10px'}>
          <TabList>
            <Tab w={'50%'}>Login</Tab>
            <Tab w={'50%'}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </div>
  )
}

export default HomePage
