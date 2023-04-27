require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const db = require('./db/db')
const cors = require('cors')
const user = require('./routes/user')
app.use(cors())
app.use(express.json())

app.use('/user',user)

app.get('/',(req,res)=>{
    res.json('hello')
})


app.listen(port,()=>{
    console.log(`hello from port ${port}`)
})