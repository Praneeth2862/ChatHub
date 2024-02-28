const express=require('express')
const dotenv =require('dotenv')
const {chats}=require('./data.js')
const connectDB = require('./config/db.js')
const { notFound,errorHandler} = require('./middlewares/errorMiddleware.js')
const app=express()
const PORT = process.env.PORT || 5000
dotenv.config()
connectDB()
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("APiRunning nigga")
})
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes);
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT,()=>{
    console.log("N");
})

const io = require("socket.io")(server,{
    pingTimeOut:60000,
    cors:{
        origin:"http://localhost:3000",
    },
});
io.on("connection",(socket)=>{
    console.log("socket.io connected")

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("user Joined the room: "+room)
    })
    socket.on("new message",(newMessageReceived) =>{
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log("chat.sers not defined");

        chat.users.forEach(user =>{
            if(user._id == newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received",newMessageReceived);
        })

    })
})