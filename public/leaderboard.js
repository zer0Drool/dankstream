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
// var socket = io.connect('http://192.168.1.234:8080'); //ts
var socket = io.connect('http://172.20.10.2:8080'); //salazar

//declarations
// var hits = document.getElementsByClassName('hits');
var viewers = document.getElementsByClassName('viewers');
var scores = document.getElementsByClassName('score');
var bars = document.getElementsByClassName('bar');
var positions = document.getElementsByClassName('position');
var uVizAd = document.getElementById('capita');
var leader = document.getElementsByClassName('leader')[0];
// var vid = document.getElementsByTagName('video')[0];
var charImgs = document.getElementsByClassName('charImg');

var stats;
var totalScore;
var oldLeader = null;
var newLeader = null;

socket.on('connect', function(data) {
   socket.emit('join', {who: 9});

   socket.on('updateScore', (data) => {
       stats = data;
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
       oldLeader = newLeader;
       newLeader = chaPos[0].name;
       if (!oldLeader || newLeader !== oldLeader) {
           leader.classList.add('flash');
           setTimeout(() => {
               leader.classList.remove('flash');
           }, 1100)
       }
       leader.innerText = `leader: ${newLeader}`;

       for (var i = 0; i < chaPos.length; i++) {
           for (var j = 0; j < stats.length; j++) {
               if (chaPos[i].name === stats[j].name) {
                   stats[j].position = i === 0 ? '1st' : i === 1 ? '2nd' : i === 2 ? '3rd' : '4th';
               }
           }
       }

       for (var i = 0; i < 4; i++) {
           positions[i].innerText = stats[i].position;
           if (charImgs[i].classList.contains('winning')) {
               charImgs[i].classList.remove('winning');
           }
           if (stats[i].position === '1st') {
               charImgs[i].classList.add('winning');
           }
       }

       console.log(stats);
   });

   socket.on('timeForAd', (data) => {
       uVizAd.src = data.url;
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });
});

// document.addEventListener('click', () => {
//     vid.play();
// })
