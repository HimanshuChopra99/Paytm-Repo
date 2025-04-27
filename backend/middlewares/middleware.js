const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Authorization header missing or malformed"
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decode = jwt.verify(token, JWT_SECRET);

        if(decode.userId) {
            req.userId = decode.userId;
            next();    
        } else {
            return res.status(403).json({
                msg: "Error in verifying jwt"
            })
        }
        
    } catch(err) {
        return res.status(403).json({
            msg: err.message
        })
    }
}

module.exports = {
    authMiddleware
}