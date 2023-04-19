const jwt = require('jsonwebtoken');

const verifyJWT = async (token) => { 
    console.log(token);
     const isMatch =  jwt.verify(token,'landonsecret')
     console.log(isMatch);
     return isMatch 
}

const createJWT = async ({payload}) => { 
    console.log(payload);
    const token = jwt.sign(payload, 'landonsecret', {
        expiresIn: '1d'
    })
    return token
}

const addAuthCookie = async ({res, token}) => { 
    
    return res.cookie('user', token, {
        expires: new Date(Date.now() + 86400000), 
        signed: false,
        httpOnly: false
    })
}


module.exports = {
    createJWT,
    addAuthCookie,
    verifyJWT
}
