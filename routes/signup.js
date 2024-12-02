const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/signup.js')
const router = express.Router();

router.post('/signup' , async (req,res) => {
    const {name, email, username, password} = req.body;
    try {
        let checkuser = await User.findOne({email, username});
        if (checkuser)  return res.status(400).json({message: "already registered with this email"});
        
        const hashedPassword = await bcrypt.hash(password, 10)
        let newUser = new User({name: name, email: email, username: username, password: hashedPassword});

        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' });
    }
})

module.exports = router;