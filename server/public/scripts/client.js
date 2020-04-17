console.log('client.js has loaded');
$(document).ready(onReady);
let verbose = false;

function onReady() {
    if (verbose) console.log('in onReady');
    getMath();
    $('#plusButton').on('click', plusButtonClick);
    $('#minusButton').on('click', minusButtonClick);
    $('#multiplyButton').on('click', multiplyButtonClick);
    $('#divideButton').on('click', divideButtonClick);
    $('#submitButton').on('click', postMath)
}

// Start Click Listener Functions
let operator='NONE'
function plusButtonClick(){
    console.log('You pressed on PLUS');
    operator='PLUS';
}
function minusButtonClick() {
    console.log('You pressed on MINUS');
    operator = 'MINUS';
}
function multiplyButtonClick() {
    console.log('You pressed on MULTIPLY');
    operator = 'TIMES';
}
function divideButtonClick() {
    console.log('You pressed on DIVIDE');
    operator = 'DIVIDEBY';
}
// End Click Listener Functions

function getMath() {
    console.log('in getMath');
    $.ajax({
        type: 'GET',
        url: '/math'
    }).then(function (taco) {
        console.log('Back from Server /math with:', taco)
        // RUN renderToDom
    }).catch(function (err) {
        alert('Your GET has an error, check console!')
        console.log(err)
    })// End AJAX for GET /math
} // End getMath function


function postMath() {
    console.log('in postMath');
    // Gather information from webpage
    let objectToSend = {
        left: $('#leftInput').val(),
        operator: operator,
        right: $('#rightInput').val()
    }
    console.log( 'Sending:', objectToSend)

    $.ajax({
        type: 'POST',
        url: '/math',
        data: objectToSend
    }).then(function (hamburger) {
        console.log('Back with Response from Server:', hamburger)
    }).catch(function (error) {
        alert('Your POST has an error, check console!')
        console.log(err)
    })// END AJAX for POST /math
} // End postMath function

function getAnswer (){
    $.ajax({
        type: 'GET',
        url: '/answer'
    }).then(function (fajita) {
        console.log('Back from Server /math with:', fajita)
        // RUN renderToDom
    }).catch(function (err) {
        alert('Your GET has an error, check console!')
        console.log(err)
    })// End AJAX for GET /answer
}