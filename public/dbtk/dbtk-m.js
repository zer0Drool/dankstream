console.log('james-master');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.4:8080'); //salazarX
var socket = io.connect('http://172.20.10.3:8080'); //tsX


//declarations
var jButtonOne = document.getElementById('j-button-one');
var jButtonTwo = document.getElementById('j-button-two');
var jButtonThree = document.getElementById('j-button-three');
var jButtonFour = document.getElementById('j-button-four');
var jButtonFive = document.getElementById('j-button-five');

socket.on('connect', function(data) {
    socket.emit('join', {who: 5});

    socket.on('shadeThrown', () => {
        console.log('the people have thown shade');
        document.body.classList.add('slung');
        setTimeout(() => {
            document.body.classList.remove('slung');
        }, 3100);
    });
});

jButtonOne.addEventListener('click', () => {
    console.log('zing');
    socket.emit('zing');
});

jButtonTwo.addEventListener('click', () => {
    console.log('go away');
    socket.emit('goAway', {message: 'GO AWAY'});
});

jButtonThree.addEventListener('click', () => {
    console.log('get out');
    socket.emit('goAway', {message: 'GET OUT'});
});

jButtonFour.addEventListener('click', () => {
    console.log('please leave');
    socket.emit('goAway', {message: 'PLEASE LEAVE'});
});

jButtonFive.addEventListener('click', () => {
    console.log('nuke');
    socket.emit('nuke', {member: 'db'});
});
