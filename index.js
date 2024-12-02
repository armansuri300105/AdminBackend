const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const orderdetail = require('./models/products.js');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const cookieParser = require('cookie-parser');
const verifyToken = require('./authentication/verification.js');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(cors({
    origin: ['https://adminfrontend-6dt4.onrender.com', 'https://adminbackend-447g.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// Routes
const signup = require('./routes/signup.js');
const login = require('./routes/login.js');

app.use('/api', signup);
app.use('/api', login);


app.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
})

app.get('/', verifyToken, async (req, res) => {
    try {
        const data = await orderdetail.find();
        res.render("index", { data: data, user: req.user });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose Connected Successfully");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
