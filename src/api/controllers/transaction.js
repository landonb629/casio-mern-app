const User = require('../models/User')

const showBalance = async (req, res) => { 
    try {  
        const {userId, username } = req.user
        const user = await User.findOne({_id: userId})
        res.status(200).json({user})
    } catch(error) { 
        res.status(200).json({msg: error})
    }
}

const deposit = async (req, res) => { 
    try {  
        const {amount} = req.body
        const {userId, username} = req.user
        const user = await User.findOne({_id: userId})
        const newValue = user.accountBalance + amount 
        user.accountBalance = newValue
        await user.save()
       // const update = await User.findOneAndUpdate({_id: userId, accountBalance: newValue})
        res.status(200).json({user})
    } catch(error) { 
        res.status(200).json({msg: error})
    }
}

const withdrawl = async (req, res) => { 
    try {  
        const {amount} = req.body 
        if (!amount) { 
            return res.status(404).json({msg: 'please include an amount to withdrawl'})
        }
        const {userId, username} = req.user 
        const user = await User.findOne({_id: userId })
        if (user.accountBalance <= 0) { 
            return res.status(200).json({msg: 'your account balance is at zero'})
        }
        const newValue = user.accountBalance - amount
        user.accountBalance = newValue
        await user.save()
        res.status(200).json({msg: `withdraw succeeded, new value: ${user.accountBalance}`})
    } catch(error) { 
        res.status(200).json({msg: error})
    }
}

module.exports = { 
    showBalance,
    deposit,
    withdrawl
}