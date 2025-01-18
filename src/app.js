// Initializes the server and routes
const express = require('express');
const medicalRecordsRouter = require('./routes/medicalRecords');

const app = express();
app.use(express.json());

// Routes
app.use('/api/medical', medicalRecordsRouter);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
