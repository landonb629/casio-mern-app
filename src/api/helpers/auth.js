const jwt = require('jsonwebtoken')

const createJWT = async ({payload}) => { 
    console.log(payload);
    const token = jwt.sign(payload, 'landonsecret', {
        expiresIn: '1d'
    })
    return token
}

module.exports = {
    createJWT
}