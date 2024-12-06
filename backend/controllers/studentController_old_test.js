const StudentData = require('../model/studentSchema.js')

module.exports.get_all_student_data = async (req, res) => {
    try {
        const allStudents = await StudentData.find()
        res.status(200)
        res.send({
            status: 'success',
            body: allStudents
        })
    }
    catch (err) {
        res.status(400)
        res.send({
            status: 'fail',
            message: err.message
        })
    }
}



// module.exports.sign_up_student = async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
//         const hashedStudentData = {
//             ...req.body,
//             password: hashedPassword
//         }
//         const newStudent = await StudentData.create(hashedStudentData)
//         console.log("Data added")
//         res.status(201);
//         res.send({
//             status: 'success',
//             body: newStudent
//         });
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400)
//         res.send({
//             status: 'fail',
//             message: err.message
//         })
//     }
// }

// module.exports.login_student = async (req, res) => {
//     try {
//         const { college_id, email, password: pass } = req.body;

//         let student;
//         if (college_id)
//             student = await StudentData.findOne({ college_id });
//         else if (email)
//             student = await StudentData.findOne({ email });

//         if (!student)
//             throw new Error("Invalid email or college ID");

//         const isPasswordCorrect = await bcrypt.compare(pass, student.password)

//         if (!isPasswordCorrect)
//             throw new Error("Incorrect password");

//         const token = jwt.sign(
//             { id: student._id, college_id: student.college_id, email: student.email },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_EXPIRES_IN }
//         );

//         res.status(200).send({
//             status: 'success',
//             token,
//             body: {
//                 college_id: student.college_id || null,
//                 email: student.email || null
//             }
//         });
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err.message
//         });
//     }
// }


// module.exports.delete_all_data = async (req, res) => {
//     try {
//         const result = await StudentData.deleteMany();

//         res.status(200).json({
//             status: 'success',
//             message: 'All student data has been deleted',
//             deletedCount: result.deletedCount // returns the number of documents deleted
//         });
//     }
//     catch (err) {
//         res.status(404);
//         res.json({
//             status: 'fail',
//             message: err.message,
//         });
//     }
// }
