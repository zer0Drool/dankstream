console.log('james');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
var socket = io.connect('http://192.168.1.234:8080'); //ts

//declarations
var jButton = document.getElementsByClassName('interaction')[0];
var uVizAd = document.getElementById('capita');

socket.on('connect', function(data) {
   socket.emit('join', {who: 0});

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

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 0});
   })
});

jButton.addEventListener('click', () => {
    socket.emit('throwingShade', {who: 4});
});