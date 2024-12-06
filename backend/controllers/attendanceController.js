const Attendance = require('../model/attendanceSchema.js');  // Ensure path is correct
const moment = require('moment'); // Optional for date handling (install via npm if needed)

// Mark today’s attendance for a student as “Present”
module.exports.mark_attendance_today = async (req, res) => {
    try {
        const { student_id } = req.body;

        if (!student_id) {
            return res.status(400).send({
                status: 'fail',
                message: 'Student ID is required'
            });
        }

        // Use today's date without time to ensure a consistent format
        const today = moment().startOf('day').toDate();

        // Find and update or create today's attendance for the student
        const attendance = await Attendance.findOneAndUpdate(
            { student_id, date: today },
            { status: 'Present' },
            { upsert: true, new: true, setDefaultsOnInsert: true } // `upsert` creates if not exists
        );

        res.status(200).send({
            status: 'success',
            data: attendance
        });
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    }
};

// Get data of all students marked “Present” for a specific date
module.exports.get_present_students_by_date = async (req, res) => {
    try {
        const { date } = req.body;

        if (!date) {
            return res.status(400).send({
                status: 'fail',
                message: 'Date is required'
            });
        }

        // Format the input date without time
        const attendanceDate = moment(date).startOf('day').toDate();

        // Find all students marked “Present” for the specified date
        const presentStudents = await Attendance.find({ date: attendanceDate, status: 'Present' });

        res.status(200).send({
            status: 'success',
            data: presentStudents
        });
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all attendance records for a specific student
module.exports.get_all_attendance_by_student = async (req, res) => {
    try {
        const { student_id } = req.body;

        if (!student_id) {
            return res.status(400).send({
                status: 'fail',
                message: 'Student ID is required'
            });
        }

        // Find all attendance records for the specified student
        const attendanceRecords = await Attendance.find({ student_id });

        res.status(200).send({
            status: 'success',
            data: attendanceRecords
        });
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    }
};
