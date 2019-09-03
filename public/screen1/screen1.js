if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var wtfCount = 0;
var wtfSrcs = [];
var wtfObjs = [];
var wtfLoader = 0;
var wtfLoaded = false;

for (var i = 0; i < 841; i++) {
    wtfSrcs.push(`/megaBatch/wtf${i + 1}.jpeg`);
    var wtfObj = new Image();
    wtfObj.src = wtfSrcs[i];
    wtfObj.onload = function() {
        wtfLoader++;
        console.log(wtfLoader);
        if (wtfLoader === 841) {
            wtfLoaded = true;
            console.log('OMG!!!!',  wtfObjs.length);
            // ctx.drawImage(wtfObjs[2], 0, 0, wtfObjs[wtfCount].naturalWidth, wtfObjs[wtfCount].naturalHeight, Math.random() * ((canvas.width - 100) - 0) + 0, Math.random() * ((canvas.height - 100) - 0) + 0, wtfObjs[wtfCount].naturalHeight / 20, wtfObjs[wtfCount].naturalHeight / 20);
            wtfStream();
        }
    }
    wtfObjs.push(wtfObj);
}

var socket = io.connect('https://dankstream.herokuapp.com/'); //online
// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.3:8080'); //tsX

var uVizAd = document.getElementById('capita');
var nuke = document.getElementById('nuke');
var nukeImg = document.getElementById('nukeImg');

socket.on('connect', function(data) {
   socket.emit('join', {who: 12});

   socket.on('timeForAd', (data) => {
       uVizAd.src = data.url;
       setTimeout(() => {
           uVizAd.classList.add('adTime');
           setTimeout(() => {
               uVizAd.classList.remove('adTime');
           }, 6000);
       }, 1000)
   });


   socket.on('bombsAway', (data) => {
       console.log(data.member);
       nukeImg.src = `/assets/nukes/${data.member}.png`
       nuke.style.display = 'flex';
       setTimeout(() => {
           nuke.style.display = 'none';
       }, 5000)
   })
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function wtfStream() {
    setInterval(() => {
        var wtfRANDO = Math.floor(Math.random() * 841);
        ctx.drawImage(wtfObjs[wtfRANDO], 0, 0, wtfObjs[wtfRANDO].naturalWidth, wtfObjs[wtfRANDO].naturalHeight, Math.random() * (canvas.width - (-200)) + (-200), Math.random() * (canvas.height - (-200)) + (-200), wtfObjs[wtfCount].naturalHeight / 4, wtfObjs[wtfCount].naturalHeight / 4);
    }, 300);
}
