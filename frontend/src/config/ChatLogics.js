export const getSender = (loggedUser,users) =>{
    return users[0]._id == loggedUser._id?users[1]:users[0];
}
export const isSender = (loggedUser,message) =>{
    return loggedUser._id == message.sender._id;
}