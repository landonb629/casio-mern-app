const Game = require('../models/Games')
const User = require('../models/User')

const listGame = async (req, res) => { 
    try { 
        const game = await Game.find({})
        res.status(200).json({game})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}


const playGame = async (req, res) => { 
    try { 
        const {name} = req.params
        console.log(req.params)
        const {userId, username } = req.user 
        const user = await User.findOne({_id: userId})
        if (!user) { 
            return res.status(500).json({msg: 'no user found'})
        }
        const game = await Game.findOne({name: name})
        console.log(game)
        if (!game) { 
            return res.status(500).json({msg: 'no game found'})
        }
        const gameCost = game.cost 
        const accountBalance = user.accountBalance
        if (gameCost > accountBalance) { 
            return res.status(500).json({msg: 'sorry, you do not have enough for this game, please deposit more money into your account'})
        }
        const accountReduction = accountBalance - gameCost 
        user.accountBalance = accountReduction
        await user.save()
        res.status(200).json({newBalance: accountReduction, purchase: `${game.name}`, msg: 'have fun!'})
    } catch(error) { 
        res.status(500).json({msg: error})
    }
}

const gameCreate = async (req, res) => { 
    try { 
        const {name, cost } = req.body 
        if (!name || !cost) { 
            return res.status(500).json({msg: 'please add cost and name'})
        }
        const game = await Game.create({...req.body})
        res.status(200).json({game})
    } catch(error) { 
        res.status(500).json({msg: error})
    }
}

module.exports = { 
    playGame,
    listGame,
    gameCreate
}