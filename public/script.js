console.log('AVATAR SELECTA');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var uVizAd = document.getElementById('capita'); 

var socket = io.connect('http://192.168.1.226:8080'); //studio

socket.on('connect', function(data) {
   socket.emit('join', {who: 'selecta'});

   socket.on('allIsFuked', data => {
       console.log(data.who, ' pwns all');
   });

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });
});
