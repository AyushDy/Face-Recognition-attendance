const express = require('express');
const attendanceController = require('../controllers/attendanceController.js');

const attendanceRouter = express.Router();

attendanceRouter
    .route('/markAttendance')
    .post(attendanceController.mark_attendance_today);

attendanceRouter
    .route('/getPresentByDate')
    .post(attendanceController.get_present_students_by_date);

attendanceRouter
    .route('/getStudentAttendance')
    .post(attendanceController.get_all_attendance_by_student);

module.exports = attendanceRouter;
