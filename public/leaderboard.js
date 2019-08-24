console.log('leaderboard');

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
// var hits = document.getElementsByClassName('hits');
var viewers = document.getElementsByClassName('viewers');
var scores = document.getElementsByClassName('score');
var bars = document.getElementsByClassName('bar');
var positions = document.getElementsByClassName('position');
var uVizAd = document.getElementById('capita');
var leader = document.getElementById('leader');
var vid = document.getElementsByTagName('video')[0];
var imgs = document.getElementsByTagName('img');

var totalScore;

socket.on('connect', function(data) {
   socket.emit('join', {who: 'leaderboard'});

   socket.on('updateScore', (stats) => {
       console.log(stats);
       totalScore = stats[0].score + stats[1].score + stats[2].score + stats[3].score;

       var chaPos = [];

       for (var i = 0; i < 4; i++) {

           var posObj = {
               name: stats[i].name,
               score: stats[i].score
           };
           chaPos.push(posObj);

           // hits[i].innerText = stats[i].hits;
           viewers[i].innerText = stats[i].viewers;
           scores[i].innerText = Math.floor(stats[i].score);
           var scorePerc = (stats[i].score / totalScore) * 100;
           bars[i].style.width = `${scorePerc}%`;
       }

       chaPos.sort((a, b) => b.score - a.score);
       leader.innerText = `leader: ${chaPos[0].name}`;

       for (var i = 0; i < chaPos.length; i++) {
           for (var j = 0; j < stats.length; j++) {
               if (chaPos[i].name === stats[j].name) {
                   stats[j].position = i + 1;
                   if (i === 0) {
                       imgs[j].classList.add('winning');
                   }
               }
           }
       }

       for (var i = 0; i < positions.length; i++) {
           positions[i].innerText = stats[i].position;
       }
   });

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });
});

document.addEventListener('click', () => {
    vid.play();
})
