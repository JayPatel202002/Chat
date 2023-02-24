const express = require('express');
const PORT  = 8080;
const app = express();

app.use(express.json())

app.post("/", (req, res)=>{
    const { user, password } = req.body;

    res.send(`${user} ${password}`)
    console.log(`${user} ${password}`)
})

app.use('/register', require('./routes/register'));

app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})