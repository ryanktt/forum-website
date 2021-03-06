const express = require('express');
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db');

const auth = require('./middleware/auth');
const checkAdmin = require('./middleware/checkAdmin');
const checkStatus = require('./middleware/checkStatus');

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

connectDB();

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin')

//Define Routes
app.use('/auth', authRoute);
app.use('/user', auth, userRoute);
app.use(clientRoute);
app.use('/admin', auth, checkAdmin, adminRoute);


app.get('/', (req,res) => {
    res.send('<h1>test</h1>')
})
 

app.listen(5000, () => {
    console.log('running on port 5000')
})