const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const {Signup,GetData,Login, addToCart,removeCartItem, Postquery, Getquery} = require('../controller/user')


route.post("/signup",Signup)
route.post('/login',Login)
route.get('/getuser',auth,GetData)
route.patch('/addtocart',auth,addToCart)
route.patch('/delCartItem',auth,removeCartItem)
route.post('/query',auth,Postquery)
route.get('/query',Getquery)




module.exports= route




