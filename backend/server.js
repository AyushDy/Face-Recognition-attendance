require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const cors = require('cors');

const port = process.env.PORT || 6969;

const url = "mongodb+srv://<username>:<password>@<database>.cup2spz.mongodb.net/";
const userName = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const DataBase = process.env.MONGO_DB;

const db_url = url.replace('<username>', userName).replace('<password>', password).replace('<database>', DataBase);
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Only this origin will be allowed to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

mongoose.connect(db_url)
    .then((con) => {
        console.log('-------------Connected to Database------------')
    })
    .catch((err) => {
        console.log('Database connection failed : ', err.message)
    })

app.listen(port, () => {
    console.log('________________Server Started________________')
}) 