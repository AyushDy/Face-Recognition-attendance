const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact_no: {
        type: String,
        required: true
    },
    parent_id: {
        type: String,
        required: true,
        unique: true
    },
    parent_name: {
        type: String,
        required: true
    },
    parent_contact_no: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('hackathon_student', studentSchema);