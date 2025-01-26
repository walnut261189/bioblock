// Initializes the server and routes
const express = require('express');
const mongoose = require('mongoose');
const medicalRecordsRouter = require('./routes/medicalRecords');
const { initP2PServer, broadcast } = require('./p2p');
const PORT = process.env.PORT || 3000;
const P2P_PORT = process.env.P2P_PORT || 6000;

// Initialize P2P server
initP2PServer(P2P_PORT, medicalChain);
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