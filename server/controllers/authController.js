const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}
const  bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const {createRefreshToken}  = require('../controllers/authToken');
const {createAccessToken}  = require('../controllers/authToken');
const handleAuth = async(req, res)=>{
    const { user, pwd } = req.body;

    if(!user || !pwd) return res.status(400).json({'message':"Invalid login"});

    const foundUser = userDB.users.find( person => person.username === user );
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);

    //successfully logged in 

    if(match){

        res.cookie('jwt',createRefreshToken(foundUser.username),{ httpOnly: true });

        res.send( createAccessToken(foundUser.username) )
    }else{
        res.sendStatus(401); 
    }
}

module.exports = { handleAuth }