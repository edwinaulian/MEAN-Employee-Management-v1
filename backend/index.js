const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db.js');
const PORT = 3003;
var employeeController = require('./controllers/employeeController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}));

app.listen(PORT, () => console.log("Server started at port : ", PORT));

app.use('/employees', employeeController);