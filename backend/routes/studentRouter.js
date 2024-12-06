const express = require('express');
const studentController = require('../controllers/studentController.js');

const studentRouter = express.Router();

studentRouter
    .route('/getAllStudents')
    .get(studentController.get_all_student_data);

studentRouter
    .route('/getStudent')
    .post(studentController.get_student_data);

studentRouter
    .route('/addStudent')
    .post(studentController.add_student_data);

studentRouter
    .route('/updateStudent')
    .patch(studentController.update_student_data);


module.exports = studentRouter;
