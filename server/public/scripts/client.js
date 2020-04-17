console.log('client.js has loaded');
$(document).ready(onReady);
let verbose = false;

function onReady() {
    if (verbose) console.log('in onReady');
    getMath();
}

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
$.ajax({
    type:'POST',
    url:'/math',
    data: objectToSend
}).then(function (hamburger){
    console.log('You posted:', hamburger)    
}).catch(function (error){
    alert('Your POST has an error, check console!')
    console.log(err)
})// END AJAX for POST /math
} // End postMath function