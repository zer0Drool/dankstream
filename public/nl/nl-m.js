console.log('ian-master');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var messages = document.getElementById('messages');
var lucaboiz = document.getElementById('responses')
var responses = document.getElementsByClassName('response');
var write = document.getElementById('write');
var send = document.getElementById('send');
var nuke = document.getElementById('nuke');
var textarea = document.getElementsByTagName('textarea')[0];
var fathoms = [1, 2, 3, `This is where it all began. My creation. My everything.
I was at Tomorrowland, 2019, absorbed by Lucozade and delicious cheesy corned based
snacks; mostly off-brand Wotsits. Riding on this spiritual wave, I found myself within a crowd of
vapers, Monster Energy, and background fart- Paris Hilton was DJing. I felt NO FEAR.
As my metaphysical journey continued into a realm of uncertainty, myself and Paris began to
communicate through telepathy, bonding over our love for electronic music and cigarettes. We
communicated for hours, Paris impressed by my uncontrollable thirst of energy.
I explained to her that it was thanks to my diet of Lucozade and off brand Wotsits. She was
stunned. And that's when it started. She lit a cigarette and went deep into the recesses of my
mind. It just made sense. An image of orange, of mutant, of nugget, of Wotsit became
emblazoned into my motor neurone network- an image that has never left. It was the spiritual
awakening that I had, so, been longing for. I owe Paris everything. Long live the sacred nugget.`, 'boom'];

var socket = io.connect('https://dankstream.herokuapp.com/'); //online
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://192.168.1.226:8080'); //gibson
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://172.20.10.3:8080'); //tsX
// var socket = io.connect('http:///172.20.10.3:8080'); //harlesden

messages.style.height = `${window.innerHeight - write.offsetHeight}px`;
lucaboiz.style.bottom = `${write.offsetHeight + 10}px`;

function createMessage(name, messagex) {
    var message = document.createElement("div");
    var id = document.createElement("p");
    id.innerText = name;
    var text = document.createElement("p");
    text.innerText = messagex;
    message.appendChild(id);
    message.appendChild(text);
    message.classList.add('message');
    if (name === 'Nugget Lord') {
        message.classList.add('lord');
    }
    messages.prepend(message);
}

socket.on('connect', () => {
    socket.emit('join', {who: 8});

    socket.on('getTheMessageNL', data => {
        createMessage(data.name, data.message);
    });

});

for (let i = 0; i < responses.length; i++) {
    responses[i].addEventListener('click', () => {
        socket.emit('newMessageNL', {name: 'Nugget Lord', message: fathoms[i]});
    })
}

send.addEventListener('click', () => {
    if (textarea.value) {
        socket.emit('newMessageNL', {name: 'Nugget Lord', message: textarea.value});
        createMessage('Nugget Lord', textarea.value);
        textarea.value = '';
    }
});

nuke.addEventListener('click', () => {
    socket.emit('nuke', {member: 'nl', stats: 3})
});
