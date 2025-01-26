// Route to handle medical data CRUD operations
const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const mongoose = require('mongoose');
const { broadcast } = require('../p2p');
const { initConnection } = require('../p2p'); // Import P2P connection logic
const MedicalRecord = require('../models/medicalRecord');
const router = express.Router();

const medicalChain = new Blockchain();

router.post('/add-record', async (req, res) => {
    const { patientID, diagnosis, medication } = req.body;

    // Save to MongoDB
    try {
        const record = new MedicalRecord({ patientID, diagnosis, medication });
        await record.save();

        // Add to blockchain
        const newBlock = {
            index: medicalChain.chain.length,
            timestamp: new Date().toISOString(),
            data: { patientID, diagnosis, medication },
        };
        medicalChain.addBlock(newBlock);

        res.status(201).send({ message: 'Record added to blockchain and database', newBlock });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save record', details: error.message });
    }
});

router.get('/chain', (req, res) => {
    res.send(medicalChain);
});

router.get('/records', async (req, res) => {
    try {
        const records = await MedicalRecord.find();
        res.send(records);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch records', details: error.message });
    }
});

router.post('/add-record', async (req, res) => {
    const { patientID, diagnosis, medication } = req.body;

    try {
        const record = new MedicalRecord({ patientID, diagnosis, medication });
        await record.save();

        const newBlock = {
            index: medicalChain.chain.length,
            timestamp: new Date().toISOString(),
            data: { patientID, diagnosis, medication },
        };
        medicalChain.addBlock(newBlock);

        // Broadcast the new block to peers
        broadcast({ type: 'NEW_BLOCK', block: newBlock });

        res.status(201).send({ message: 'Record added to blockchain and database', newBlock });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save record', details: error.message });
    }
});

router.post('/connect', (req, res) => {
    const { peerUrl } = req.body; // URL of the peer to connect to
    if (!peerUrl) {
        return res.status(400).send({ error: 'Peer URL is required' });
    }

    try {
        const ws = new WebSocket(peerUrl); // Create WebSocket connection to the peer
        initConnection(ws); // Initialize connection using the P2P logic
        res.status(200).send({ message: `Successfully connected to peer: ${peerUrl}` });
    } catch (error) {
        res.status(500).send({ error: 'Failed to connect to peer', details: error.message });
    }
});


module.exports = router;