const { createJWT } = require('../helpers/auth')
const User = require('../models/User')

const register = async (req, res) => { 
    try { 
        const {username, password} = req.body;
        if (!username || !password) { 
            return res.status(404).json({msg: 'must have username and password'})
        }
        const user = await User.create({...req.body})
        const userObject = {userId: user._id, username: user.username}
        const token = await createJWT({payload: userObject})
        res.status(200).json({user: user.username, token: token})
    } catch(error) { 
        res.status(404).json({msg: error})
    }
}

const login = async (req, res) => { 
    res.status(200).json({msg: 'hit login'})
}

module.exports = { register, login}


/*
authentication flow:
- user registers
- password is salted and hashed
- token is generated
- cookie is returned to the browser

progress:
- users register
- password is salted and hashed
- token is generated
- returned to use in json

*/