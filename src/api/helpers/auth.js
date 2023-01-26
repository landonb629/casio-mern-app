const jwt = require('jsonwebtoken');


const createJWT = async ({payload}) => { 
    console.log(payload);
    const token = jwt.sign(payload, 'landonsecret', {
        expiresIn: '1d'
    })
    return token
}

const addAuthCookie = async ({res, token}) => { 
    return res.cookie('token', token, {
        expires: new Date(Date.now() + 90000), 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        signed: true 
    })
}

module.exports = {
    createJWT,
    addAuthCookie
}