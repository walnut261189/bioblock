// Route to handle medical data CRUD operations
const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const mongoose = require('mongoose');
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

module.exports = router;