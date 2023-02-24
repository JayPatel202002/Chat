const express = require('express');
const PORT  = 8080;
const app = express();
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

app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})