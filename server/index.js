const express = require('express');
const PORT  = 8080;
const app = express();

app.get("/", (req, res)=>{
    res.send("Hello world!")
})

app.listen(PORT, ()=>{
    console.log(`The server is running on the http://localhost:${PORT}`)
})