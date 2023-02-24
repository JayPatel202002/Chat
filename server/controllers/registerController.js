const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){this.users = data}
}

const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');

const handleRegister = async(req, res)=>{
    const { user, pwd } = req.body;

    if( !user || !pwd ) return res.status(400).json({"message": "Please enter the userID and password!!"});

    const duplicate = await userDB.users.find(person => person.username === user);

    if(duplicate) return res.sendStatus(409);

    try{
        const hashedPwd = await bcrypt.hash(pwd, 12);

        const newUser = {"username":user, "password": hashedPwd}
        userDB.setUsers([...userDB.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({ 'success': `New user ${user} created!`});

    }catch(err){
        res.status(500).json({
            'message': err.message
        })
    }
} 

module.exports = { handleRegister }