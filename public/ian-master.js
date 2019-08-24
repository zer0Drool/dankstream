console.log('ian-master');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

// var socket = io.connect('http://192.168.1.226:8080'); //studio
var socket = io.connect('http://192.168.4.1:8080'); //ultraPi

//declarations
var iButtonOne = document.getElementById('i-button-one');
var iButtonTwo = document.getElementById('i-button-two');

socket.on('connect', function(data) {
    socket.emit('join', {who: 'ian-master'});

    socket.on('shadeThrown', () => {
        console.log('the people have thown shade');
        document.body.classList.add('slung');
        setTimeout(() => {
            document.body.classList.remove('slung');
        }, 3100);
    });
});

iButtonOne.addEventListener('click', () => {
    socket.emit('getRekt', {who: 'ian'});
});

iButtonTwo.addEventListener('click', () => {
    socket.emit('fuckYouAll', {who: 'ian'});
});
