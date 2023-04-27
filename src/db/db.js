const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("db failed",err)
})
