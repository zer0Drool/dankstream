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
        name: 'Nugget Lord',
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
    }
]

io.on('connection', (socket) => {
    socket.on('join', data => {
        console.log(data.who);
        if (data.who < 4) {
            socket.dankRoom = data.who;
            socket.join(data.who);
            stats[data.who].hits += 1;
            stats[data.who].viewers += 1;
            stats[data.who].score += ((stats[data.who].hits * stats[data.who].viewers) / 10);
            console.log(stats[data.who]);
            io.emit('updateScore', stats);
        }
    });

    socket.on('disconnect', () => {
        console.log('DANK ROOOOM', socket.dankRoom);
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(8080, () => console.log('land ahoy captain!'));
