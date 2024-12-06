const mongoose = require('mongoose');

const faceDetailsSchema = new mongoose.Schema({
    data: [
        {
            label: { type: String, required: true },
            descriptors: { type: [[Number]], required: true }
        }
    ]
});


module.exports = mongoose.model('hackathon-student-faceData', faceDetailsSchema);