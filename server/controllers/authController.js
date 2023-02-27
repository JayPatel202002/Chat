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

        const accessToken = jwt.sign(
            { "username": foundUser.username },
            "qwertyuio",
            { expiresIn: '10m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            "asdfjklp",
            { expiresIn: '1d' }
        );
        res.cookie('jwt',refreshToken,{ httpOnly: true });
        res.send({accessToken})
    }else{
        res.sendStatus(401); 
    }
}

module.exports = { handleAuth }