const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect("mongodb+srv://karyamsettypraneethisaac:mernchatapp@cluster0.ffuo4au.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            
        }
        );
        console.log("Mongodb connected")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports =connectDB;