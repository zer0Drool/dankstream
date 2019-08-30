const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public'));

var stats = [
    {
        name: 'Dead Boy the Kid',
        hits: 0,
        time: 0,
        viewers: 0,
        score: 0,
        position: null
    },
    {
        name: 'Prawn Boy',
        hits: 0,
        time: 0,
        viewers: 0,
        score: 0,
        position: null
    },
    {
        name: 'Worm Person',
        hits: 0,
        time: 0,
        viewers: 0,
        score: 0,
        position: null
    },
    {
        name: 'Nugget Lord',
        hits: 0,
        time: 0,
        viewers: 0,
        score: 0,
        position: null
    }
]

var roomsArray = ['james', 'grant', 'tori', 'ian', 'james-m', 'grant-m', 'tori-m', 'ian-m'];

io.on('connection', (socket) => {
    socket.on('join', data => {
        socket.join(roomsArray[data.who - 1]);
        console.log('DATA>WHO', data.who);
        if (data.who <= 4) {
            socket.dankRoom = data.who - 1;
            console.log('THE DANK ROOM PLOX', socket.dankRoom);
            console.log('SDndsvbdspibvc;dsvbdsvbd;fsbuvdlisbvsd;ibjvd;afb', socket.rooms);
            stats[data.who - 1].hits += 1;
            stats[data.who - 1].viewers += 1;
            stats[data.who - 1].score += ((stats[data.who - 1].hits * stats[data.who - 1].viewers) / 10);
            console.log('AM I GERE???', stats[data.who - 1]);
            io.emit('updateScore', stats);
        }
    });

    socket.on('disconnect', () => {
        if (socket.dankRoom) {
            stats[socket.dankRoom].viewers -= 1;
            io.emit('updateScore', stats);
        }
    })

    socket.on('getRekt', data => {
        socket.to(data.who).emit('yourRekt');
    });

    socket.on('fuckYouAll', data => {
        io.emit('allIsFuked', {who: data.who});
    });

    socket.on('throwingShade', data => {
        socket.to(data.who).emit('shadeThrown');
    });

    socket.on('newMessageNL', data => {
        var info = {
            name: data.name,
            message: data.message
        }
        socket.to('ian').emit('getTheMessageNL', info);
        socket.to('ian-m').emit('getTheMessageNL', info);
    });
});

function uVizionAdTimer() {
    io.emit('timeForAd');
};

setInterval(uVizionAdTimer, 300000);
// setInterval(uVizionAdTimer, 10000);

app.get('/deadboythekid', (req, res) => {
    res.sendFile(__dirname + '/deadboythekid.html');
});

app.get('/wormperson', (req, res) => {
    res.sendFile(__dirname + '/wormperson.html');
});

app.get('/prawnboy', (req, res) => {
    res.sendFile(__dirname + '/prawnboy.html');
});

app.get('/nuggetlord', (req, res) => {
    res.sendFile(__dirname + '/nuggetlord.html');
});

app.get('/dbtk-m', (req, res) => {
    res.sendFile(__dirname + '/dbtk-m.html');
});

app.get('/wp-m', (req, res) => {
    res.sendFile(__dirname + '/wp-m.html');
});

app.get('/pb-m', (req, res) => {
    res.sendFile(__dirname + '/pb-m.html');
});

app.get('/nl-m', (req, res) => {
    res.sendFile(__dirname + '/nl-m.html');
});

app.get('/leaderboard', (req, res) => {
    res.sendFile(__dirname + '/leaderboard.html');
});

app.get('/die', (req, res) => {
    res.sendFile(__dirname + '/die.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(8080, () => console.log('land ahoy captain!'));
