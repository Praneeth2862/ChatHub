import { createContext,useEffect,useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ChatContext = createContext();
export const ChatProvider = ({children}) =>{
    const [user,setUser] = useState();
    const [selectedChat,setSelectedChat] = useState();
    const [chats,setChats] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("User Info:", userInfo);
        setUser(userInfo); // Set user state
        if (!userInfo) {
          history.push("/");
        }
      }, [history]);
    
      useEffect(() => {
        // This useEffect hook ensures that user state is updated before performing any actions depending on it
        if (user && user.token) {
          // Example: Accessing user token
          console.log("User token:", user.token);
        }
      }, [user]);
    
    
    return(
        <ChatContext.Provider value={{user,setUser,setSelectedChat,selectedChat,chats,setChats}}>
            {children}
        </ChatContext.Provider>
    )
}
