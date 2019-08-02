console.log('tori-master');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('http://192.168.1.226:8080'); //studio

//declarations
var tButtonOne = document.getElementById('t-button-one');
var tButtonTwo = document.getElementById('t-button-two');

socket.on('connect', function(data) {
    socket.emit('join', {who: 'tori-master'});

    socket.on('shadeThrown', () => {
        console.log('the people have thown shade');
        document.body.classList.add('slung');
        setTimeout(() => {
            document.body.classList.remove('slung');
        }, 3100);
    });
});

tButtonOne.addEventListener('click', () => {
    socket.emit('getRekt', {who: 'tori'});
});

tButtonTwo.addEventListener('click', () => {
    socket.emit('fuckYouAll', {who: 'tori'});
});
