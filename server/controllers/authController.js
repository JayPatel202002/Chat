const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const { rmSync } = require('fs');

const handleAuth = async(req, res)=>{
    const { user, pwd } = req.body;

    if(!user || !pwd) return res.status(400).json({'message':"Please enter the userID and password!!"});

    const foundUser = userDB.users.find( person => person.username === user );
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match){
        return res.status(201).json({
            'message': `the User ${user} is successfully logged in!!`
        })
    }else{
        res.sendStatus(401); 
    }
}

module.exports = { handleAuth }