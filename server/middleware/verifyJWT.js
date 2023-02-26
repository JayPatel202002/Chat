const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({
        'messsge':"Unauth"
    });

    const token = authHeader.split(' ')[1];

    try{
        // verfiying the token which we will get back from the user
     jwt.verify(
        token,
        "qwertyuio",    
        (err, decoded)=>{
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next()
        })
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            'message':"Unauth"
        });
    }


}

module.exports = verifyJWT