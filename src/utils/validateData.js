// Utility to validate incoming medical data
function validateData(data) {
    const { patientID, diagnosis, medication } = data;
    if (!patientID || !diagnosis || !medication) {
        throw new Error('Invalid medical data');
    }
    return true;
}

module.exports = validateData;
