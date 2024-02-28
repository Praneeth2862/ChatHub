const express = require('express')
const {registerUser,authUser,allUsers} = require('../controllers/userController')
const userRoutes = express.Router()
const protect = require("../middlewares/authMiddleware")
 userRoutes.route('/').post(registerUser).get(protect,allUsers)
 userRoutes.post('/login',authUser)


module.exports = userRoutes;