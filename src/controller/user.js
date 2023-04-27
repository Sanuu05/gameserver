const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Query =  require('../model/query')
exports.Signup=async(req,res)=>{
    try {
        const {email,name,password,cpassword} = req.body
        
        if (!name) {
            return res.status(400).json({
                msg: "enter name"
            })
        }
        else if (!email) {
            return res.status(400).json({
                msg: "enter email"
            })
        }else if (!password) {
            return res.status(400).json({
                msg: "enter password"
            })
        }
        else if (!cpassword) {
            return res.status(400).json({
                msg: "enter confirm password"
            })
        }
        else if (cpassword!==password) {
            return res.status(400).json({
                msg: "Check password and confirm password"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "user exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const userRes = new User({
            name,
            email,
            password:hashPassword

        })
        const userSave = await userRes.save()
        res.json("signup sucesfully")
    } catch (error) {
        
    }
   
}
exports.Login=async(req,res)=>{
    try {
        
        const { email, password } = req.body
        console.log("vc",req.body)
        if (!email) {
            return res.status(400).json({
                msg: "fill the email feild"
            })
        }
         if (!password) {
            return res.status(400).json({
                msg: "fill the password feild"
            })
        }
        const exuser = await User.findOne({ email })
         if (!exuser) {
            return res.status(400).json({
                msg: "user does not exits"
            })
        }
        const isMatch = await bcrypt.compare(password, exuser.password)
        if (!isMatch) {
            return res.status(400).json({
                msg: "details doesnt match"
            })
        }
        const token = await jwt.sign({ id: exuser._id }, process.env.SEC_KEY)
        exuser.password = undefined
        res.json({
            token,
            user: exuser
        })
    } catch (error) {
        console.log(error)
        console.log()
    }
   
}
exports.GetData=async(req,res)=>{
    try {
        const userRes = await User.findById(req.user).sort({'_id':-1})
        if (!userRes) {
            return res.status(400).json({
                msg: "not auth user"
            })
        }
        res.json({
            user:userRes
        })
    } catch (error) {
        
    }
   
}
exports.addToCart=async(req,res)=>{
    try{
      
        const user = await User.findByIdAndUpdate(req.user,{
            $addToSet:{
                cart:req.body
                
            }
        },{new:true})
        res.json(user)
    }
    catch{

    }
}
exports.removeCartItem=async(req,res)=>{
    try {
        const { id } = req.body
        console.log("cvc",req.body)
        if (id) {
            const del = await User.findByIdAndUpdate( req.user , {
                            $pull: {
                                cart: {
                                    id: id

                                }
                            }
                        })
                        res.json(del)
                    }

    } catch (error) {
        console.log('err',error)

    }

}
exports.Postquery= async(req,res)=>{
    try {
        const {item,eventStart,eventEnd,setUp,totalItemAmount,totalHours,delivery,deliveryCharges,totalAmount,user,payType} = req.body
        console.log('ee',req.user)
        const putdata = new Query({
            items:item,
            eventStart
            ,eventEnd
            ,setUp
            ,totalItemAmount
            ,totalHours
            ,delivery
            ,deliveryCharges
            ,totalAmount,
            user,payType

        })
        const saveData =await putdata.save()
        const removeCart = await User.findByIdAndUpdate(req.user,{
            $set:{
                cart:[]
            }
        })
        res.json(saveData)
    } catch (error) {
        
    }
}
exports.Getquery= async(req,res)=>{
    try {
        const putdata = await Query.find()
        res.json(putdata)
    } catch (error) {
        
    }
}


