const {verifyJWT} = require('../helpers/auth')

const checkAuth = async (req, res, next) => { 
    try {   
        const token = req.cookies.user
        if (!token) { 
            return res.status(403).json({msg: "please authenticate"})
        }
        const { userId, username } = await verifyJWT(token)
        req.user = {userId, username} // here we are setting the user
        next()

    } catch(error){ 
        console.log(error);
    }
   
}


module.exports = { checkAuth }


/* 
1. check for a signedCookie
2. get the signed cookie and add it to the jwt verify method
3. if there is a valid response, send to the next route


*/