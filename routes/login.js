const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/signup.js');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const checkuser = await User.findOne({ username });
        if (!checkuser) return res.status(400).json({ message: "You are not registered" });

        const match = await bcrypt.compare(password, checkuser.password);
        if (!match) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: checkuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
        httpOnly: true,
        secure: req.secure || process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-origin
        maxAge: 3600000 // 1 hour
    });


        res.json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
