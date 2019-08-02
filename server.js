const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public'));

io.on('connection', (socket) => {
    console.log(socket, ' has joined the party');
});

app.get('/james', (req, res) => {
    res.sendFile(__dirname + '/james.html');
});

app.get('/tori', (req, res) => {
    res.sendFile(__dirname + '/tori.html');
});

app.get('/grant', (req, res) => {
    res.sendFile(__dirname + '/grant.html');
});

app.get('/ian', (req, res) => {
    res.sendFile(__dirname + '/ian.html');
});

app.get('/james-master', (req, res) => {
    res.sendFile(__dirname + '/james-master.html');
});

app.get('/tori-master', (req, res) => {
    res.sendFile(__dirname + '/tori-master.html');
});

app.get('/grant-master', (req, res) => {
    res.sendFile(__dirname + '/grant-master.html');
});

app.get('/ian-master', (req, res) => {
    res.sendFile(__dirname + '/ian-master.html');
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(8080, () => console.log('land ahoy captain!'));
