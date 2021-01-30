const express = require('express');
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db');
const auth = require('./middleware/auth');

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

connectDB();

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const clientRoute = require('./routes/client');

//Define Routes
app.use(authRoute, auth);
app.use(userRoute, auth);
app.use(clientRoute, auth);


app.get('/', (req,res) => {
    res.send('<h1>test</h1>')
})


app.listen(5000, () => {
    console.log('running on port 5000')
})