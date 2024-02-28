const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const {Chat} = require('../models/chatModel')

const sendMessage = asyncHandler( async (req,res) =>{
    const {content,chatId} = req.body;
    if(!content || !chatId){
        return res.status(400).send("Fill all req Fields for chat")
    }
    let newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId,
    };
    try{

        var message = await Message.create(newMessage);
        
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path:"chat.users",
            select:"name email pic"
        })
        await Chat.findByIdAndUpdate(chatId,{
            latestMessage:message,
        })
        res.status(200).json(message);

    }catch(err){
        res.status(400).send(err);

    }
})

const allMessages = asyncHandler( async (req,res) =>{
    try{
        
        const chatId = req.params.chatId;
        
    const messages = await Message.find({chat:chatId}).populate("sender","name pic email").populate("chat")
    // console.log(messages);
    res.status(200).json(messages);
    }
    catch(err){
        res.status(400).send(`err:${err}`);
    }
})


module.exports = {sendMessage,allMessages};