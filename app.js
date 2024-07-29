// app.js
const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/url', urlRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
