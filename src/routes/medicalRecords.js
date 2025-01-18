// Route to handle medical data CRUD operations
const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const router = express.Router();

const medicalChain = new Blockchain();

router.post('/add-record', (req, res) => {
    const { patientID, diagnosis, medication } = req.body;
    const newBlock = {
        index: medicalChain.chain.length,
        timestamp: new Date().toISOString(),
        data: { patientID, diagnosis, medication },
    };
    medicalChain.addBlock(newBlock);
    res.status(201).send({ message: 'Record added to blockchain', newBlock });
});

router.get('/chain', (req, res) => {
    res.send(medicalChain);
});

module.exports = router;
