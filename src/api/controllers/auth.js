const { createJWT, addAuthCookie } = require('../helpers/auth')
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
        const cookie = await addAuthCookie({res, token})
        //res.cookie('token', token,{expires: new Date(Date.now() + 90000), httpOnly: true} )
        res.status(200).json({userObject})
    } catch(error) { 
        res.status(404).json({msg: error})
    }
}

const login = async (req, res) => { 
    res.status(200).json({msg: 'hit login'})
}

const checkRoute = async (req, res) => { 
    res.status(200).json({cookie: req.signedCookies})
}

module.exports = { register, login, checkRoute}


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
- cookie is returned to the browser 

*/