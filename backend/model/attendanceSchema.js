const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Absent',
    }
});

module.exports = mongoose.model('hackathon-student-attendance', attendanceSchema);