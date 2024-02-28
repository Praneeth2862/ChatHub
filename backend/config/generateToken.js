const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id},"praneeth",{
        expiresIn : "30d"
    })
}

module.exports = generateToken;