const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users'); // Import the User model
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existuser = await Users.findOne({ email })
    try {
        if (existuser) {
            
            return res.status(400).send("User already exists...:(")
        }

        const encryptPassword = await bcrypt.hash(password, 10)

        const newuser = new Users({ username, email, password: encryptPassword })
        await newuser.save()
        res.json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        if (user && password) {
            const auser = {
                id : user._id,
                username : user.username,
                email : user.email
            }
            jwt.sign({auser : auser}, process.env.JWT_SECRET, (err,token)=>{
                // res.writeHead({'authorization':'token'})
                res.json({token});
            })
        }
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Login failed' });
    }
})

module.exports = router;