const mongoose = require('mongoose')
const {Schema} = mongoose 

const Transaction = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    type: { 
        type: String, 
        enum: ["Deposit", "Withdrawl"]
    },
    amount: { 
        type: Number
    }
})

module.exports = mongoose.model('Transaction', Transaction)