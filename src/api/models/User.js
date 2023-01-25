const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')


const User = new Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: { 
        type: String,
        required: [true, 'password is required']
    },
    accountBalance: { 
        type: Number
    }
})

User.pre('save', async function() {
    try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    
    } catch(error) { 
       throw new Error(error)
    }
})



module.exports = mongoose.model('User', User)