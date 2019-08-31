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

var roomsArray = ['james', 'grant', 'tori', 'ian', 'james-m', 'grant-m', 'tori-m', 'ian-m', 'leaderboard', 'die', 'instructions'];
var areWeDying = false;
var nuked = false;
var adCount = 0;
var adArr = ['/assets/avatarSelecta/uviz.png', '/assets/avatarSelecta/cube.png', '/assets/avatarSelecta/damndank.png'];

io.on('connection', (socket) => {
    socket.on('join', data => {

        socket.join(roomsArray[data.who - 1]);

        if (data.who <= 4) {
            socket.dankRoom = data.who - 1;
            stats[data.who - 1].hits += 1;
            stats[data.who - 1].viewers += 1;
            stats[data.who - 1].score += ((stats[data.who - 1].hits * stats[data.who - 1].viewers) / 10);
            socket.to('leaderboard').emit('updateScore', stats);
        }
    });

    socket.on('disconnect', () => {
        if (socket.dankRoom) {
            stats[socket.dankRoom].viewers -= 1;
            socket.to('leaderboard').emit('updateScore', stats);
        }
    });

    socket.on('getRekt', data => {
        socket.to(data.who).emit('yourRekt');
    });

    socket.on('fuckYouAll', data => {
        io.emit('allIsFuked', {who: data.who});
    });

    socket.on('throwingShade', data => {
        socket.to(data.who).emit('shadeThrown');
    });

    // IAN SOCKETS

    socket.on('newMessageNL', data => {
        var info = {
            name: data.name,
            message: data.message
        }
        if (data.name !== 'Nugget Lord') {
            stats[3].score += 10;
            socket.to('leaderboard').emit('updateScore', stats);
        }
        socket.to('ian').emit('getTheMessageNL', info);
        socket.to('ian-m').emit('getTheMessageNL', info);
    });

    // GRANT SOCKETS

    socket.on('prawnPoints', data => {
        stats[1].score += data;
        socket.to('leaderboard').emit('updateScore', stats);
    });

    socket.on('saveprawns', () => {
        socket.to('grant').emit('savethatprawn');
    });

    //JAMES SOCKETS

    socket.on('zing', () => {
        socket.to('james').emit('lightning');
        socket.to('die').emit('lightning');
    });

    socket.on('goAway', (data) => {
        socket.to('james').emit('fuckOff', data.message);
    });

    socket.on('die', (data) => {
        if (!areWeDying) {
            console.log('time to die');
            areWeDying = true;
            socket.to('die').emit('timeToDie');
            setTimeout(() => {
                areWeDying = false;
            }, 1800000)
        };
    });

    // nuke

    socket.on('nuke', (data) => {
        if (!nuked) {
            nuked = true;
            console.log(data.member);
            io.emit('bombsAway', {member: data.member});
            setTimeout(() => {
                nuked = false;
            }, 8000)
        }
    })

});

function uVizionAdTimer() {
    io.emit('timeForAd', {url: adArr[adCount]});
    adCount = adCount < adArr.length - 1 ? adCount += 1 : 0;
};

setInterval(uVizionAdTimer, 10000);
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

app.get('/instructions', (req, res) => {
    res.sendFile(__dirname + '/instructions.html');
});

app.get('/logscores', (req, res) => {
    console.log(stats);
    res.send(stats);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(8080, () => console.log('land ahoy captain!'));
