// Requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use & Serve Files
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Globals
const PORT = 5000;
let math = [];
let answer = math.length;

// Spin Up Server
app.listen(PORT, () => {
    console.log('Server up and running on:', PORT);
}) // End Listen

// Routes
app.get('/math', (req, res) => {
    console.log('in /math GET');
    res.send(math);
}) // End /math GET

app.get('/answer', (req, res) => {
    console.log('in /answer GET');
    console.log('Answer is', answer)
})

app.post('/math', (req, res) => {
    console.log('in /math POST with:', req.body);
    math.push(req.body);
    res.sendStatus(201);
}) // End /math POST