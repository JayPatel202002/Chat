const jwt = require('jsonwebtoken');

 const createAccessToken = (user)=>{
    return jwt.sign(
        { "username": user },
        "qwertyuio",
        { expiresIn: '10m' }
    );
}
 
 const createRefreshToken = (user)=>{
   return jwt.sign(
        { "username": user },
        "asdfjklp",
        { expiresIn: '1d' }
    );
}
module.exports = {createAccessToken, createRefreshToken}

