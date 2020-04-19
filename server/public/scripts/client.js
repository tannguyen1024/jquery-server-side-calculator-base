$(document).ready(onReady); // Loads once document has completed loading
let verbose = false; // Used to hide all console.log

function onReady() {
    if (verbose) console.log('in onReady');
    getMath();
    $('#plusButton').on('click', plusButtonClick);
    $('#subtractButton').on('click', subtractButtonClick);
    $('#multiplyButton').on('click', multiplyButtonClick);
    $('#divideButton').on('click', divideButtonClick);
    $('#submitButton').on('click', postMath);
    $('#clearButton').on('click', clearButtonClick)
}

// Start Click Listener Functions
let operator = 'NONE'
function plusButtonClick() {
    console.log('You pressed PLUS');
    $(this).siblings().removeClass('clicked');
    $(this).addClass('clicked');
    operator = '+';
}
function subtractButtonClick() {
    console.log('You pressed MINUS');
    $(this).siblings().removeClass('clicked');
    $(this).addClass('clicked');
    operator = '-';
}
function multiplyButtonClick() {
    console.log('You pressed MULTIPLY');
    $(this).siblings().removeClass('clicked');
    $(this).addClass('clicked');
    operator = '*';
}
function divideButtonClick() {
    console.log('You pressed DIVIDE');
    $(this).siblings().removeClass('clicked');
    $(this).addClass('clicked');
    operator = '/';
}
function clearButtonClick() {
    console.log('You pressed CLEAR');
    $('#leftInput').val('');
    $('#rightInput').val('');
}
function buttonClicked (){
    
}
// End Click Listener Functions

function getMath() {
    if (verbose) console.log('in getMath');
    $.ajax({
        type: 'GET',
        url: '/math'
    }).then(function (taco) {
        if (verbose) console.log('Back from Server /math with:', taco)
        renderToDom(taco);
    }).catch(function (err) {
        alert('Your GET has an error, check console!')
        console.log(err)
    })// End AJAX for GET /math
} // End getMath function

function postMath() {
    if (verbose) console.log('in postMath');
    // Gather information from webpage
    if (operator == "NONE") {
        alert('Please select an operator!')
    }
    else {
        let objectToSend = {
            left: $('#leftInput').val(),
            operator: operator,
            right: $('#rightInput').val()
        }
        if (verbose) console.log('Sending:', objectToSend)
        $.ajax({
            type: 'POST',
            url: '/math',
            data: objectToSend
        }).then(function (hamburger) {
            if (verbose) console.log('Back with Response from Server:', hamburger)
            getMath();
        })/*End then*/.catch(function (error) {
            alert('Your POST has an error, check console!')
            if (verbose) console.log(err)
        }) // End catch
    } // End AJAX for POST /math
} // End postMath function

function renderToDom(history) {
    let el = $('#history');
    el.empty();
    for (let i = 0; i < history.length; i++) {
        el.append(`<li>${history[i].left} ${history[i].operator} ${history[i].right} = ${history[i].answer}</li>`)
        if (i === history.length-1) {
            $('#answer').empty().append(`${history[i].answer}`)
        }
    }
}

// function getAnswer() {
//     $.ajax({
//         type: 'GET',
//         url: '/answer'
//     }).then(function (fajita) {
//         console.log('Back from Server /math with:', fajita)
//         // RUN renderToDom
//     }).catch(function (err) {
//         alert('Your GET has an error, check console!')
//         console.log(err)
//     })// End AJAX for GET /answer
// } // Unnecessary GET function.  Removed.