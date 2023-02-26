const express = require('express');
const PORT  = 8080;
const app = express();
const path = require('path');
const verifyJWT =require('./middleware/verifyJWT');
const fsPromises = require('fs').promises;
require('dotenv').config();
const cookieParser = require('cookie-parser');

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
// app.use(verifyJWT);
app.get('/employee', (req, res)=>{
    res.sendFile(path.join(__dirname,'model','employees.json'));
})
app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})