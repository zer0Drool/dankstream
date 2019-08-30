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
var socket = io.connect('http://172.20.10.2:8080'); //salazar

//declarations
var jButtonOne = document.getElementById('j-button-one');
var jButtonTwo = document.getElementById('j-button-two');

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
    socket.emit('getRekt', {who: 0});
});

jButtonTwo.addEventListener('click', () => {
    socket.emit('fuckYouAll', {who: 0});
});
