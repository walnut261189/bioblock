// Mongoose schema for medical records
const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientID: { type: String, required: true },
    diagnosis: { type: String, required: true },
    medication: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
