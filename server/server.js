// Requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use & Serve Files
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Globals
const PORT = 5000;
let math = []; // Used by req.body
let answer = 0; // Used by doMath
let objectToClient = []; // Used by doMath
let mathReturn = []; // Used by doMath to send back to client.js
let verbose = false; // Used to hide all console.log

// Spin Up Server
app.listen(PORT, () => {
    console.log('Server up and running on:', PORT);
}) // End Listen

// Routes
app.get('/math', (req, res) => {
    if (verbose) console.log('in /math GET');
    res.send(mathReturn);
}) // End /math GET

app.post('/math', (req, res) => {
    if (verbose) console.log('in /math POST with:', req.body);
    math.push(req.body);
    doMath();
    res.sendStatus(201);
}) // End /math POST

// Math Function
function doMath (){
    let current = math.length-1;
    if (verbose) console.log(current);
    if (verbose) console.log(math[current].operator);
    if (math[current].operator == '+'){
        if (verbose) console.log('That was addition!')
        answer = (Number(math[current].left))+(Number(math[current].right));
        if (verbose) console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "+",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        if (verbose) console.log(mathReturn)
    }
    else if (math[current].operator == '-') {
        if (verbose) console.log('That was subtraction!')
        answer = (math[current].left) - (math[current].right);
        if (verbose) console.log(answer);
        objectToClient = {
            left: math[current].left, 
            operator: "-", 
            right: math[current].right, 
            answer: answer
        }
        mathReturn.push(objectToClient);
        if (verbose) console.log(mathReturn)
    }
    else if (math[current].operator == '*') {
        if (verbose) console.log('That was multiplication!')
        answer = (math[current].left) * (math[current].right);
        if (verbose) console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "*",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        if (verbose) console.log(mathReturn)
    }
    else if (math[current].operator == '/') {
        if (verbose) console.log('That was division!')
        answer = (math[current].left) / (math[current].right);
        if (verbose) console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "/",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        if (verbose) console.log (mathReturn)
    }
}

// app.get('/answer', (req, res) => {
//     if (verbose) console.log('in /answer GET');
//     if (verbose) console.log('Answer is', answer)
//     res.send(objectToClient);
// }) // Unnecessary GET route, removed.