console.log('james');

window.onerror = function(msg, url, linenumber) {
    alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
    return true;
}

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('http://192.168.1.226:8080'); //studio

socket.on('connect', function(data) {
   console.log('socket connected - data ', data);
});
