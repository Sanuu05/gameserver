const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    cart:{
        type:Array
    }
})

const User = mongoose.model('Users',userSchema)
module.exports = User