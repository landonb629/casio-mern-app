const Transaction = require('../models/Transaction')
const User = require('../models/User')

const showBalance = async (req, res) => { 
    try {  
        const {userId, username } = req.user
        const user = await User.findOne({_id: userId}).select("-password")
        res.status(200).json({user})
    } catch(error) { 
        res.status(200).json({msg: error})
    }
}

const showTransaction = async (req, res) => { 
    try {
        const {userId} = req.user 
        const transactions = await Transaction.find({user: userId})
        if (!transactions) { 
            return res.status(500).json({msg: 'no transactions'})
        }
        res.status(200).json({transactions})
    } catch(error) { 
        res.status(500).json({msg: error})
    }
}

const deposit = async (req, res) => { 
    try {  
        console.log('hitting deposit route')
        const {amount} = req.body
        console.log(amount)
        const {userId, username} = req.user
        const user = await User.findOne({_id: userId})
        const transaction = await Transaction.create({amount: amount, user: userId, type: "Deposit"})
        if (!transaction) { 
            return res.status(500).json({msg: 'transaction creation failed'})
        }
        const newValue = Number(user.accountBalance) + Number(amount) 
        const update = await User.findOneAndUpdate({_id: userId}, {accountBalance: newValue}, {new: true})
        if (!update) { 
            return res.status(403).json({msg: 'error'})
        }
        //user.accountBalance = newValue
        //await user.save()
        console.log({user: {userId, username}, amount: user.accountBalance})
        res.status(200).json({user: {userId, username}, amount: user.accountBalance})
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
        if (user.accountBalance - amount <= 0) { 
            return res.status(200).json({msg: 'please deposit more money in order to play this game'})
        }
        const transaction = await Transaction.create({amount: amount, user: userId, type: "Withdrawl"})
        if (!transaction) { 
            return res.status(403).json({msg: 'error'})
        }
        const newValue = Number(user.accountBalance) - Number(amount)
        const update = await User.findOneAndUpdate({_id: userId}, {accountBalance: newValue}, {new: true})
        if (!update) { 
            return res.status(403).json({msg: 'error'})
        }
        console.log({user: {userId, username}, amount: user.accountBalance});
        res.status(200).json({user: {userId, username}, amount: user.accountBalance})
    } catch(error) { 
        res.status(200).json({msg: error})
    }
}

module.exports = { 
    showBalance,
    deposit,
    withdrawl,
    showTransaction
}