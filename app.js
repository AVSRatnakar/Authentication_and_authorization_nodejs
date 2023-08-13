const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connectDb = require('./config/db')
const authMiddleware = require('./middleware/authmiddleware')
const app = express();
app.use(express.json())
app.use
connectDb()

app.get('/', authMiddleware,(req,res)=>{
    jwt.verify(req.token, process.env.JWT_SECRET, (err,user)=>{
        if(err) return res.sendStatus(401).send("Unauthorized error");
        else{
            res.json({message : "Welcome, access granted :)", user : req.user})
        }
    })  
})

app.use('/users', require('./routes/auth'))
app.listen(8520, ()=>{
    console.log("listening on port 8520");
})