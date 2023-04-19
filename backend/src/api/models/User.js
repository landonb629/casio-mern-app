const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')


const User = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'password is required']
    },
    accountBalance: { 
        type: Number,
        default: 0,
        immutable: false
    }
})

User.pre('save', async function(next) {
    try {
    const salt = await bcrypt.genSalt(10)
    console.log(`creating password as: ${this.password}`)
    this.password = await bcrypt.hash(this.password, salt)
    next()
    } catch(error) { 
       throw new Error(error)
    }
})

User.methods.comparePasswords = async function(givenPassword) { 
        console.log(givenPassword);
        const isMatch = await bcrypt.compare(givenPassword, this.password)
        console.log(`outcome of comparing password: ${isMatch}`)
        return isMatch   
}



module.exports = mongoose.model('User', User)