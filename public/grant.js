console.log('grant');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('http://192.168.1.226:8080'); //studio

//declarations
var gButton = document.getElementById('g-button');

socket.on('connect', function(data) {
   socket.emit('join', {who: 'grant'});

   socket.on('yourRekt', data => {
       console.log('getting rekt');
       document.body.classList.add('rekt');
       setTimeout(() => {
           document.body.classList.remove('rekt');
       }, 3100);
   });

   socket.on('allIsFuked', data => {
       console.log(data.who, ' pwns all');
       document.body.classList.add('pwned');
       setTimeout(() => {
           document.body.classList.remove('pwned');
       }, 2100);
   });
});

gButton.addEventListener('click', () => {
    socket.emit('throwingShade', {who: 'grant-master'});
});
