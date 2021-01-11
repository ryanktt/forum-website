const express = require('express');
require('dotenv').config()
const connectDB = require('./db');

const app = express();

// Init Middleware
app.use(express.json());

connectDB();

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const clientRoute = require('./routes/client');

//Define Routes
app.use(authRoute);
app.use(userRoute);
app.use(clientRoute);


app.get('/', (req,res) => {
    res.send('<h1>test</h1>')
})


app.listen(5000, () => {
    console.log('running on port 5000')
})