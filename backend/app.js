const express = require('express')
const cors = require('cors')

const app = express()

const studentRouter = require('./routes/studentRouter.js')
const attendanceRouter = require('./routes/attendanceRouter.js');
const faceDetailsRouter = require('./routes/faceDetailsRouters.js');


app.use(express.json())
app.use(cors())
app.use('/v1/student', studentRouter)
app.use('/v1/attendance', attendanceRouter);
app.use('/v1/faceDetails', faceDetailsRouter);

module.exports = app