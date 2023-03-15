const { createJWT, addAuthCookie } = require('../helpers/auth')
const User = require('../models/User') 

const register = async (req, res) => { 
    try { 
        const {username, password} = req.body;
        if (!username || !password) { 
            return res.status(404).json({msg: 'must have username and password'})
        }
        const user = await User.create({...req.body}) // {username: username, password: password}
        const payload = {userId: user._id, username: user.username}
        const token = await createJWT({payload: payload})
        await addAuthCookie({res, token: token})
        res.status(200).json({payload})
    } catch(error) { 
        return res.status(404).json({msg: error})
    }
}

const login = async (req, res) => { 
    try { 
        const {username, password} = req.body
        if (!username || !password) { 
            return res.status(404).json({msg: 'please register'})
        }
        const user = await User.findOne({username})
        if (!user) { 
            res.status(404).json({msg: 'no user found'})
        }
        const isCorrectPassword = await user.comparePasswords(password)
        if (!isCorrectPassword) { 
            return res.status(404).json({msg: 'please provide a correct username and password'})
        }
        const payload = {userId: user._id, username: user.username }
        const token = await createJWT({payload: payload})
        await addAuthCookie({res, token: token})
        res.status(200).json({payload: payload})

    } catch(error) { 
        res.status(500).json({msg: 'error encountered when trying to login'})
    }
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