require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtGenerator = user_id => {
    const data = {
        user: user_id
    }
    
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn : "2h"})
}

module.exports = jwtGenerator