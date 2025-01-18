// Initializes the server and routes
const express = require('express');
const mongoose = require('mongoose');
const medicalRecordsRouter = require('./routes/medicalRecords');

const app = express();
app.use(express.json());

// MongoDB connection
const DB_URI = 'mongodb://localhost:27017/medicalDB';
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});