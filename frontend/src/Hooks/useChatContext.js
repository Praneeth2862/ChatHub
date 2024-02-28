import { ChatContext } from "../Context/ChatProvider";
import { useContext } from "react";
export const useChatContext = ()=>{
    const context = useContext(ChatContext);

    return context;
}
