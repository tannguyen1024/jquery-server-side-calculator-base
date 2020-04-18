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
let answer = 0;
let objectToClient = [];
let mathReturn = [];

// Spin Up Server
app.listen(PORT, () => {
    console.log('Server up and running on:', PORT);
}) // End Listen

// Routes
app.get('/math', (req, res) => {
    console.log('in /math GET');
    res.send(mathReturn);
}) // End /math GET

app.get('/answer', (req, res) => {
    console.log('in /answer GET');
    console.log('Answer is', answer)
    res.send(objectToClient);
})

app.post('/math', (req, res) => {
    console.log('in /math POST with:', req.body);
    math.push(req.body);
    doMath();
    res.sendStatus(201);
}) // End /math POST

// Math Function
function doMath (){
    let current = math.length-1;
    console.log(current);
    console.log(math[current].operator);
    if (math[current].operator == '+'){
        console.log('That was addition!')
        answer = (Number(math[current].left))+(Number(math[current].right));
        console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "+",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        console.log(mathReturn)
    }
    else if (math[current].operator == '-') {
        console.log('That was subtraction!')
        answer = (math[current].left) - (math[current].right);
        console.log(answer);
        objectToClient = {
            left: math[current].left, 
            operator: "-", 
            right: math[current].right, 
            answer: answer
        }
        mathReturn.push(objectToClient);
        console.log(mathReturn)
    }
    else if (math[current].operator == '*') {
        console.log('That was division!')
        answer = (math[current].left) * (math[current].right);
        console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "*",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        console.log(mathReturn)
    }
    else if (math[current].operator == '/') {
        console.log('That was division!')
        answer = (math[current].left) / (math[current].right);
        console.log(answer);
        objectToClient = {
            left: math[current].left,
            operator: "/",
            right: math[current].right,
            answer: answer
        }
        mathReturn.push(objectToClient);
        console.log (mathReturn)
    }
}