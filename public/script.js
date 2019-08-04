console.log('AVATAR SELECTA');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

// document.body.addEventListener('click', e => console.log(e.target));

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var uVizAd = document.getElementById('capita');
var avatarHeads = document.getElementsByClassName('avatarHead');
var avatarName = document.getElementById('avatarName');

// var socket = io.connect('http://192.168.1.226:8080'); //studio
var socket = io.connect('http://192.168.4.1:8080'); //ultraPi

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

for (var i = 0; i < avatarHeads.length; i++) {
    avatarHeads[i].addEventListener('click', e => {
        changeAvatar(e.target.alt)
    });
}

var currentlySelected = {
    name: 'james',
    index: 0
};

function changeAvatar(who) {
    var index = who === 'james' ? 0 : who === 'grant' ? 1 : who === 'tori' ? 2 : 3;
    avatarName.innerText = who;
    avatarHeads[currentlySelected.index].classList.remove('selectedHead');
    avatarHeads[index].classList.add('selectedHead');
    currentlySelected = {name: who, index: index};
}
