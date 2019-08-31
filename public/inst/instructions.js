console.log('instructions');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var uVizAd = document.getElementById('capita');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var parisSrcs = [];
var parisObjs = [];
var parisLoader = 0;
var parisLoaded = false;

for (var i = 0; i < 50; i++) {
    parisSrcs.push(`nl/paris_bomb/paris ${i + 1}.jpg`);
    var parisObj = new Image();
    parisObj.src = parisSrcs[i];
    parisObj.onload = function() {
        parisLoader++;
        if (parisLoader === 49) {
            parisLoaded = true;
        }
    }
    parisObjs.push(parisObj);
}

// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
var socket = io.connect('http://172.20.10.4:8080'); //salazarX


socket.on('connect', function(data) {
   socket.emit('join', {who: 11});

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 11});
   })
});
