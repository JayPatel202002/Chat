const express = require('express');
const PORT  = 8080;
const app = express();
const path = require('path');
const verifyJWT =require('./middleware/verifyJWT');
// const fsPromises = require('fs').promises;
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const { createAccessToken } = require('./controllers/authToken');
const { createRefreshToken } = require('./controllers/authToken');

const userDB = {
    users: require('./model/users.json'),
    setUsers: function(data){this.users = data}
}

app.use(express.json())

app.use(cookieParser())
app.get('/', (req, res)=>{
    res.send("hello server is running!!")
})
// app.post("/", (req, res)=>{
//     const { user, password } = req.body;

//     res.send(`${user} ${password}`)
//     console.log(`${user} ${password}`)
// })

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));


app.post('/refresh_token', async(req, res)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.send({ok: false, accessToken: ''})
    }
    let payload = null;
    try{
        payload = verify(token, 'asdfjklp')
    }catch(err){
        console.log(err);
        return res.send({ok: false, accessToken:''})
    }
    // the token is valid and we send back the new access token
    const user = await userDB.users.find(person => person.username === payload.username);

    if(!user){
        return res.send({ ok:false, accessToken:''});
    }

    res.cookie('jwt',createRefreshToken(user),{ httpOnly: true });

    return res.send({ ok:true, accessToken: createAccessToken(user)});

})



app.use(verifyJWT);
app.get('/employee', (req, res)=>{
    res.sendFile(path.join(__dirname,'model','employees.json'));
})
app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})