const express = require('express');
require('dotenv').config()
const connectDB = require('./db');

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('<h1>Teste</h1>');
})


app.listen(5000, () => {
    console.log('running on port 5000')
})