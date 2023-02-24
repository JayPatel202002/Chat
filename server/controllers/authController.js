const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}
const  bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const handleAuth = async(req, res)=>{
    const { user, pwd } = req.body;

    if(!user || !pwd) return res.status(400).json({'message':"Invalid login"});

    const foundUser = userDB.users.find( person => person.username === user );
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);

    //successfully logged in 

    if(match){

        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: '15m'}
        )
        // return res.status(201).json({
        //     'message': `the User ${user} is successfully logged in!!`
        // })

        res.send({ accessToken })
    }else{
        res.sendStatus(401); 
    }
}

module.exports = { handleAuth }