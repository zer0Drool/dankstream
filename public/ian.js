console.log('ian');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('http://192.168.1.226:8080'); //studio

//declarations
var iButton = document.getElementById('i-button');
var uVizAd = document.getElementById('capita');

socket.on('connect', function(data) {
   socket.emit('join', {who: 'ian'});

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

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });
});

iButton.addEventListener('click', () => {
    socket.emit('throwingShade', {who: 'ian-master'});
});
