const StudentData = require('../model/studentSchema.js');

module.exports.get_all_student_data = async (req, res) => {
    try {
        const allStudents = await StudentData.find();
        res.status(200).send({
            status: 'success',
            data: allStudents
        });
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    }
};

module.exports.get_student_data = async (req, res) => {
    try {
        const { student_id } = req.body;
        if (!student_id) {
            return res.status(400).send({
                status: 'fail',
                message: 'Student ID is required'
            });
        }

        const student = await StudentData.findOne({ student_id });
        if (!student) {
            return res.status(404).send({
                status: 'fail',
                message: 'Student not found'
            });
        }

        res.status(200).send({
            status: 'success',
            data: student
        });
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    }
};

module.exports.add_student_data = async (req, res) => {
    try {
        const newStudentData = req.body;

        const newStudent = await StudentData.create(newStudentData);
        res.status(201).send({
            status: 'success',
            data: newStudent
        });
    } catch (err) {
        res.status(400).send({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a student's data (except password and student_id)
module.exports.update_student_data = async (req, res) => {
    try {
        const { student_id, ...updatedData } = req.body;

        // Validate that student_id is provided
        if (!student_id) {
            return res.status(400).send({
                status: 'fail',
                message: 'Student ID is required'
            });
        }

        // Remove restricted fields from update data
        delete updatedData.password;
        delete updatedData.student_id;

        // Find student by ID and update only the provided fields
        const updatedStudent = await StudentData.findOneAndUpdate(
            { student_id },
            { $set: updatedData },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        // Handle case if student is not found
        if (!updatedStudent) {
            return res.status(404).send({
                status: 'fail',
                message: 'Student not found'
            });
        }

        res.status(200).send({
            status: 'success',
            data: updatedStudent
        });
    } catch (err) {
        res.status(400).send({
            status: 'fail',
            message: err.message
        });
    }
};

