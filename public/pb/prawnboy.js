// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('https://dankstream.herokuapp.com/'); //online
// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.3:8080'); //tsX

//declarations
// var tButton = document.getElementById('t-button');
var uVizAd = document.getElementById('capita');
var nuke = document.getElementById('nuke');
var nukeImg = document.getElementById('nukeImg');

socket.on('connect', function(data) {
   socket.emit('join', {who: 2});

   socket.on('timeForAd', (data) => {
       uVizAd.src = data.url;
       setTimeout(() => {
           uVizAd.classList.add('adTime');
           setTimeout(() => {
               uVizAd.classList.remove('adTime');
           }, 6000);
       }, 1000)
   });

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 2});
   });

   socket.on('savethatprawn', () => {
       getSaved();
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

// LOADING
var feedTxt = new Image();
feedTxt.src = 'pb/assets/feed.png';
feedTxt.onload = function() {
    document.getElementById('top').appendChild(feedTxt);
}
var itTxt = new Image();
itTxt.src = 'pb/assets/it.png';
itTxt.onload = function() {
    document.getElementById('bottom').appendChild(itTxt);
}
var tooTxt = new Image();
tooTxt.src = 'pb/assets/too.png';
tooTxt.id = 'too';
var fullTxt = new Image();
fullTxt.src = 'pb/assets/full.png';
fullTxt.id = 'full';

var saveReady = false;
var saveSrcs = [];
var saveObjs = [];
var saveLoader = 0;
var saveLoaded = false;

for (var i = 0; i < 3; i++) {
    saveSrcs.push(`pb/assets/gX${i + 1}.png`);
    var saveObj = new Image();
    saveObj.src = saveSrcs[i];
    saveObj.onload = function() {
        saveLoader++;
        if (saveLoader === 3) {
            saveReady = true;
        }
    }
    saveObjs.push(saveObj);
}

///////

var prawnSrcs = [];
var prawnObjs = [];
var prawnLoader = 0;
var prawnLoaded = false;

for (var i = 0; i < 8; i++) {
    prawnSrcs.push(`pb/assets/p${i + 1}.png`);
    var prawnObj = new Image();
    prawnObj.src = prawnSrcs[i];
    prawnObj.onload = function() {
        prawnLoader++;
        if (prawnLoader === 8) {
            prawnLoaded = true;
            prawnsReady();
        }
    }
    prawnObjs.push(prawnObj);
}

var prawnCanvas = document.getElementById('prawn-canvas');
prawnCanvas.width = window.innerWidth;
prawnCanvas.height = window.innerHeight;
var prawnContext =  prawnCanvas.getContext('2d');

var tearsSrcs = [];
var tearsObjs = [];
var tearsLoader = 0;
var tearsLoaded = false;

for (var i = 0; i < 5; i++) {
    tearsSrcs.push(`pb/assets/h2o${i + 1}z.png`);
    var tearsObj = new Image();
    tearsObj.src = tearsSrcs[i];
    tearsObj.onload = function() {
        tearsLoader++;
        if (tearsLoader === 5) {
            tearsLoaded = true;
            tearsReady();
        }
    }
    tearsObjs.push(tearsObj);
}

var foodSrcs = [];
var foodObjs = [];
var foodLoader = 0;
var foodLoaded = false;

for (var i = 0; i < 3; i++) {
    foodSrcs.push(`pb/assets/f${i + 1}.png`);
    var foodObj = new Image();
    foodObj.src = foodSrcs[i];
    foodObj.onload = function() {
        foodLoader++;
        if (foodLoader === 3) {
            foodLoaded = true;
            foodReady();
        }
    }
    foodObjs.push(foodObj);
}

// PRAWN VARS
var RAD = Math.PI/10000;
var whatPrawn = 0;
var foodCounter = 0;
var isReallySad = false;
var prawnXvar = 0;
var prawnXvarTog = false;
var prawnYvar = 0;
var prawnYvarTog = false;
var prawnImgInfo = [
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    },
    {
        w: 1300,
        h: 1301
    }
]

// PRAWN FUNCS
function cryPrawn() {
    whatPrawn = whatPrawn === 6 ? 7 : 6;
}

function prawnsReady() {
    prawnCanvas.addEventListener('click', letsfeedThisPrawn);
}

// TEARS VARS
var tearsReadyX = false;
var tearsToggle = 0;
var tearsPeak;
var tearsHeight = window.innerHeight;
var tearsImgInfo = [
    {
        w: 1547,
        h: 4000
    },
    {
        w: 1547,
        h: 4000
    },
    {
        w: 1547,
        h: 4000
    },
    {
        w: 1547,
        h: 4000
    },
    {
        w: 1547,
        h: 4000
    }
]

// TEARS FUNCS
function timeToCry() {
    tearsToggle = tearsToggle === 4 ? 0 : tearsToggle + 1;
}

function tearsReady() {
    tearsReadyX = true;
}

// FOOD VARS
var foodId = 1;
var foodAnimationFrame;
var foodImgInfo = [
    {
        w: 200,
        h: 200
    },
    {
        w: 125,
        h: 197
    },
    {
        w: 140,
        h: 179
    }
]
var foodSettings = {
    foodsOnScreen: [], // an array for all current foods on screen and their properties
    minScale: 0.2,
    w: window.innerWidth,
    h: window.innerHeight
}

// FOOD FUNCS
var foodReadyX = false;
function foodReady() {
    foodReadyX = true;
}

function eatmore(data) {
    var whatFood = Math.floor(Math.random() * 3);
    var scale = (Math.random() * (0.7 - foodSettings.minScale)) + foodSettings.minScale;
    foodSettings.foodsOnScreen.push({
        id: foodId,
        x: data.touchX - (foodImgInfo[whatFood].w / 2),
        y: data.touchY - (foodImgInfo[whatFood].h / 2),
        ys: data.dirY ? Math.random() : - (Math.random()),
        xs: data.dirX ? Math.random() : - (Math.random()),
        height: (scale) * foodImgInfo[whatFood].h,
        width: (scale) * foodImgInfo[whatFood].w,
        rotato: Math.floor(Math.random() * 360) + 1,
        rotatoDir: Math.random() > 0.5 ? true : false,
        opacity: 1,
        whatFood: whatFood
    });
    foodId++;
}

function foodMove() {
    for (var i = 0; i < foodSettings.foodsOnScreen.length; i++) {
        var food = foodSettings.foodsOnScreen[i];
        food.y += food.ys;
        food.x += food.xs;
        food.opacity  = food.opacity - 0.05;
        food.rotato = food.rotatoDir ? food.rotato + 4 : food.rotato - 4;
        if (food.opacity < 0) {
            foodSettings.foodsOnScreen = foodSettings.foodsOnScreen.filter(foodX => foodX.id !== food.id);
        }
    }
}

setInterval(drawFoods, 35);

function drawFoods() {
    prawnContext.clearRect(0, 0, foodSettings.w, foodSettings.h);

    var ratio = prawnImgInfo[whatPrawn].w / prawnImgInfo[whatPrawn].h
    prawnContext.globalAlpha = 1;
    if (prawnXvar < 10 && !prawnXvarTog) {
        prawnXvar = whatPrawn >= 2 && whatPrawn < 4 ? prawnXvar + (10 / (Math.random() * (57 - 10) + 10)) * 2 : whatPrawn === 4 ? prawnXvar + (10 / (Math.random() * (57 - 10) + 10)) * 3 : whatPrawn === 5 ? prawnXvar + (10 / (Math.random() * (57 - 10) + 10)) * 4 : prawnXvar + (10 / (Math.random() * (57 - 10) + 10));
        if (prawnXvar >= 10) {
            prawnXvarTog = true;
        }
    } else if (prawnXvar > - 10 && prawnXvarTog) {
        prawnXvar = whatPrawn >= 2 && whatPrawn < 4 ? prawnXvar - (10 / (Math.random() * (57 - 10) + 10)) * 2 : whatPrawn === 4 ? prawnXvar - (10 / (Math.random() * (57 - 10) + 10)) * 3 : whatPrawn === 5 ? prawnXvar - (10 / (Math.random() * (57 - 10) + 10)) * 4 : prawnXvar - (10 / (Math.random() * (57 - 10) + 10));
        if (prawnXvar <= -10) {
            prawnXvarTog = false;
        }
    }
    if (prawnYvar < 10 && !prawnYvarTog) {
        prawnYvar = whatPrawn >= 2 && whatPrawn < 4 ? prawnYvar + (10 / (Math.random() * (57 - 10) + 10)) * 2 : whatPrawn === 4 ? prawnYvar + (10 / (Math.random() * (57 - 10) + 10)) * 3 : whatPrawn === 5 ? prawnYvar + (10 / (Math.random() * (57 - 10) + 10)) * 4 : prawnYvar + (10 / (Math.random() * (57 - 10) + 10));
        if (prawnYvar >= 10) {
            prawnYvarTog = true;
        }
    } else if (prawnYvar > - 10 && prawnYvarTog) {
        prawnYvar = whatPrawn >= 2 && whatPrawn < 4 ? prawnYvar - (10 / (Math.random() * (57 - 10) + 10)) * 2 : whatPrawn === 4 ? prawnYvar - (10 / (Math.random() * (57 - 10) + 10)) * 3 : whatPrawn === 5 ? prawnYvar - (10 / (Math.random() * (57 - 10) + 10)) * 4 : prawnYvar - (10 / (Math.random() * (57 - 10) + 10));
        if (prawnYvar <= -10) {
            prawnYvarTog = false;
        }
    }
    prawnContext.drawImage(prawnObjs[whatPrawn], 0, 0, prawnImgInfo[whatPrawn].w, prawnImgInfo[whatPrawn].h, 0 + prawnXvar, ((window.innerHeight - (prawnCanvas.width / ratio)) / 2) + prawnYvar, prawnCanvas.width, prawnCanvas.width / ratio);

    if (foodReadyX) {
        for (var i = 0; i < foodSettings.foodsOnScreen.length; i++) {
            var food = foodSettings.foodsOnScreen[i];
            prawnContext.globalAlpha = food.opacity;
            prawnContext.save();
            prawnContext.translate(food.x - (food.w * 20), food.y - (food.h * 20));
            prawnContext.rotate(food.rotato * RAD);
            prawnContext.drawImage (foodObjs[food.whatFood], food.x + (foodImgInfo[food.whatFood].w / 4), food.y, food.width, food.height);
            prawnContext.restore();
        }
    }

    if (isReallySad && tearsReadyX && !tearsPeak) {
        tearsHeight = tearsHeight - (window.innerHeight / 286);
        prawnContext.globalAlpha = 0.4;
        var tearsRatio = tearsImgInfo[tearsToggle].w / tearsImgInfo[tearsToggle].h;
        prawnContext.drawImage(tearsObjs[tearsToggle], 0, 0, tearsImgInfo[tearsToggle].w, tearsImgInfo[tearsToggle].h, 0, tearsHeight, prawnCanvas.width, prawnCanvas.width / tearsRatio);
        if (tearsHeight < 0) {
            tearsPeak = true;
        }
    } else if (isReallySad && weIsReversing && tearsPeak && !goBackTears) {
        tearsHeight = 0;
        prawnContext.globalAlpha = 0.4;
        var tearsRatio = tearsImgInfo[tearsToggle].w / tearsImgInfo[tearsToggle].h;
        prawnContext.drawImage(tearsObjs[tearsToggle], 0, 0, tearsImgInfo[tearsToggle].w, tearsImgInfo[tearsToggle].h, 0, tearsHeight, prawnCanvas.width, prawnCanvas.width / tearsRatio);
    } else if (isReallySad && weIsReversing && tearsPeak && goBackTears) {
        tearsHeight = tearsHeight + (window.innerHeight / 286);
        prawnContext.globalAlpha = 0.4;
        var tearsRatio = tearsImgInfo[tearsToggle].w / tearsImgInfo[tearsToggle].h;
        prawnContext.drawImage(tearsObjs[tearsToggle], 0, 0, tearsImgInfo[tearsToggle].w, tearsImgInfo[tearsToggle].h, 0, tearsHeight, prawnCanvas.width, prawnCanvas.width / tearsRatio);
        if (tearsHeight <= 0) {
            tearsPeak = false;
        }
    }

    if (saveReady) {
        for (var i = 0; i < savedSettings.savesOnScreen.length; i++) {
            var save = savedSettings.savesOnScreen[i];
            prawnContext.globalAlpha = save.opacity;
            prawnContext.save();
            prawnContext.translate(save.x - (save.w * 20), save.y - (save.h * 20));
            prawnContext.rotate(save.rotato * RAD);
            prawnContext.drawImage (saveObjs[save.whatSave], save.x + (saveInfo[save.whatSave].w / 4), save.y, save.width, save.height);
            prawnContext.restore();
        }
    }

    saveMove()
    foodMove();
}

// MISC FUNCS
var timeToCryInterval;
var cryPrawnInterval;
var reverseCryInterval;
var hasFedInterval;

var goBackTears = false;
var hasFed = false;
var oofing = false;
var weIsReversing = false;

function animateThisShit() {
    document.getElementById('top').removeChild(document.getElementById('top').childNodes[0]);
    document.getElementById('top').appendChild(tooTxt);
    document.getElementById('bottom').removeChild(document.getElementById('bottom').childNodes[0]);
    document.getElementById('bottom').appendChild(fullTxt);
    var audioToPause = document.getElementsByTagName('audio');
    for (var i = 0; i < audioToPause.length; i++) {
        audioToPause[i].pause();
    }
    document.getElementById('ss').play();
    timeToCryInterval = setInterval(timeToCry, 693);
    cryPrawnInterval = setInterval(cryPrawn, 342);
}

function checkIfFed() {
    if (hasFedInterval) {
        window.clearTimeout(hasFedInterval);
    }
    hasFed = true;
    hasFedInterval = setTimeout(() => {
        hasFed = false;
    }, 2000);
}

var getSavedTimeout;
var saveId = 1;
var savedSettings = {
    savesOnScreen: [], // an array for all current foods on screen and their properties
    minScale: 0.2,
    w: window.innerWidth,
    h: window.innerHeight
}
var saveInfo = [
    {
        w: 400,
        h: 764
    },
    {
        w: 400,
        h: 1456
    },
    {
        w: 400,
        h: 1525
    }
];

function saveMore(data) {
    var scale = (Math.random() * (0.5 - savedSettings.minScale)) + savedSettings.minScale;
    var whatSaveX = Math.floor(Math.random() * 3)
    savedSettings.savesOnScreen.push({
        id: saveId,
        x: (window.innerWidth / 2) - (saveInfo[whatSaveX].w / 3),
        y: (window.innerHeight / 2) - (saveInfo[whatSaveX].h / 5),
        ys: Math.random() > 0.5 ? Math.random() : - (Math.random()),
        xs: Math.random() > 0.5 ? Math.random() : - (Math.random()),
        height: (scale) * saveInfo[whatSaveX].h,
        width: (scale) * saveInfo[whatSaveX].w,
        rotato: Math.floor(Math.random() * 360) + 1,
        rotatoDir: Math.random() > 0.5 ? true : false,
        opacity: 1,
        whatSave: whatSaveX
    });
    saveId++;
    console.log(savedSettings.savesOnScreen);
}

function saveMove() {
    for (var i = 0; i < savedSettings.savesOnScreen.length; i++) {
        var save = savedSettings.savesOnScreen[i];
        save.y += save.ys;
        save.x += save.xs;
        save.opacity  = save.opacity - 0.05;
        save.rotato = save.rotatoDir ? save.rotato + 4 : save.rotato - 4;
        if (save.opacity < 0) {
            savedSettings.savesOnScreen = savedSettings.savesOnScreen.filter(saveX => saveX.id !== save.id);
        }
    }
}

function getSaved() {
    if (whatPrawn > 0) {
        whatPrawn--;
        foodCounter -= 10;
    } else {
        foodCounter = 0;
    }
    saveMore();
}

var retryButton = document.getElementById('retryButton');
var retryButtonWrap = document.getElementById('retryButtonWrap');

function reverseCry() {
    if (hasFed === false && whatPrawn > 0 && isReallySad === false) {
        whatPrawn--;
        foodCounter -= 10;
    }
    if (isReallySad && weIsReversing === false) {
        weIsReversing = true
        if (reverseCryInterval) {
            window.clearInterval(reverseCryInterval);
        }
        setTimeout(() =>{
            document.getElementById('ss').pause();
        }, 19000);
        // setTimeout(backToTheStart, 20000);
        setTimeout(() => {
            retryButtonWrap.style.display = 'flex';
        }, 20000);
    }
}

retryButton.addEventListener('click', () => {
    retryButtonWrap.style.display = 'none';
    backToTheStart()
});

reverseCryInterval = setInterval(reverseCry, 3000);

function backToTheStart() {
    goBackTears = true;
    setTimeout(() => {
        document.getElementById('sh').play(); // NOT WORKING!!!!!!!
    }, 100);
    setTimeout(() => {
        window.clearInterval(cryPrawnInterval);
        hasFed = false;
        foodCounter = 0;
        isReallySad = false;
        whatPrawn = 0;
        goBackTears = false;
        weIsReversing = false;
        document.getElementById('sh').pause();
        document.getElementById('top').removeChild(document.getElementById('top').childNodes[0]);
        document.getElementById('top').appendChild(feedTxt);
        document.getElementById('bottom').removeChild(document.getElementById('bottom').childNodes[0]);
        document.getElementById('bottom').appendChild(itTxt);
        reverseCryInterval = setInterval(reverseCry, 3000);
    }, 10000);
}

function oof() {
    if (oofing) {
        return;
    } else {
        if (whatPrawn < 3) {
            document.getElementsByClassName('happy')[Math.floor(Math.random() * 4)].play();
        } else {
            document.getElementsByClassName('sad')[Math.floor(Math.random() * 4)].play();
        }

        oofing = true;
        prawnCanvas.classList.add('oof');
        setTimeout(() => {
            prawnCanvas.classList.remove('oof');
            oofing = false;
        }, whatPrawn >= 4 ? 200 : 400);
    }
}

function letsfeedThisPrawn(e) {
    if (!isReallySad) {
        // PRAWN ANIM
        foodCounter++;
        if (foodCounter === 10) {
            socket.emit('prawnPoints', 3);
            whatPrawn = 1;
        } else if (foodCounter === 20) {
            socket.emit('prawnPoints', 3);
            whatPrawn = 2;
        } else if (foodCounter === 30) {
            socket.emit('prawnPoints', 3);
            whatPrawn = 3;
        } else if (foodCounter === 40) {
            socket.emit('prawnPoints', 3);
            whatPrawn = 4;
        } else if (foodCounter === 60) {
            socket.emit('prawnPoints', 3);
            whatPrawn = 5;
        } else if (foodCounter === 70) {
            socket.emit('prawnPoints', 30);
            whatPrawn = 6;
            isReallySad = true;
            animateThisShit();
        }

        // FOOD ANIM
        var data = {
            touchX: e.pageX,
            touchY: e.pageY,
            dirX: e.pageX > (window.innerWidth / 2) ? false : true,
            dirY: e.pageY > (window.innerHeight / 2) ? false : true,
         }
        if ((data.touchX > window.innerWidth / 3 && data.touchX < window.innerWidth - (window.innerWidth / 3)) && (data.touchY > window.innerHeight / 3 && data.touchY < window.innerHeight - (window.innerHeight / 3))) {
            checkIfFed();
            oof();
            eatmore(data);
        }
    }
}
