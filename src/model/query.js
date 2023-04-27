const mongoose = require('mongoose')



const querySchema = mongoose.Schema({
    items: {
        type: Array,
    },
    user: {
        type: Object
    },
    payType: {
        type: Object
    },
    eventStart: {
        type: String
    },
    eventEnd: {
        type: String
    },
    setUp: {
        type: String
    },
    totalItemAmount: {
        type: Number,
    },
    totalHours: {
        type: Number,
    },
    delivery: {
        type: Object,
    },
    deliveryCharges: {
        type: Number,
    },
    totalAmount: {
        type: Number
    }
})

const Query = mongoose.model('Querys', querySchema)
module.exports = Query