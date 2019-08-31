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
canvas.width = window.innerWidth * 1.2;
canvas.height = window.innerHeight * 0.8;

// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.4:8080'); //salazarX
// var socket = io.connect('http://172.20.10.3:8080'); //tsX

socket.on('connect', function(data) {
   socket.emit('join', {who: 11});

   socket.on('timeForAd', (data) => {
       uVizAd.src = data.url;
       setTimeout(() => {
           uVizAd.classList.add('adTime');
           setTimeout(() => {
               uVizAd.classList.remove('adTime');
           }, 6000);
       }, 1000)
   });

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 11});
   })

   socket.on('bombsAway', (data) => {
       console.log(data.member);
       nukeImg.src = `/assets/nukes/${data.member}.png`
       nuke.style.display = 'flex';
       setTimeout(() => {
           nuke.style.display = 'none';
       }, 5000)
   })
});

var wtfCount = 0;
var wtfSrcs = [];
var wtfObjs = [];
var wtfLoader = 0;
var wtfLoaded = false;

for (var i = 0; i < 155; i++) {
    wtfSrcs.push(`/assets/wtf/${i + 1}.jpg`);
    var wtfObj = new Image();
    wtfObj.src = wtfSrcs[i];
    wtfObj.onload = function() {
        wtfLoader++;
        if (wtfLoader === 154) {
            wtfLoaded = true;
            console.log(wtfObjs);
            // ctx.drawImage(wtfObjs[2], 0, 0, wtfObjs[wtfCount].naturalWidth, wtfObjs[wtfCount].naturalHeight, Math.random() * ((canvas.width - 100) - 0) + 0, Math.random() * ((canvas.height - 100) - 0) + 0, wtfObjs[wtfCount].naturalHeight / 20, wtfObjs[wtfCount].naturalHeight / 20);
            wtfStream();
        }
    }
    wtfObjs.push(wtfObj);
}

function wtfStream() {
    setInterval(() => {
        // console.log('draw');
        ctx.drawImage(wtfObjs[wtfCount], 0, 0, wtfObjs[wtfCount].naturalWidth, wtfObjs[wtfCount].naturalHeight, Math.random() * ((canvas.width - 100) - 0) + 0, Math.random() * ((canvas.height - 100) - 0) + 0, wtfObjs[wtfCount].naturalHeight / 5, wtfObjs[wtfCount].naturalHeight / 5);
        wtfCount += 1;
        // console.log(wtfCount);
        if (wtfCount === 155) {
            wtfCount = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 100);
}
