console.log('tori');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.3:8080'); //tsX

var progress = document.getElementById('progress');

//declarations
var uVizAd = document.getElementById('capita');
var nuke = document.getElementById('nuke');
var nukeImg = document.getElementById('nukeImg');

socket.on('connect', function(data) {
   socket.emit('join', {who: 3});

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
       socket.emit('leaving', {who: 3});
   })

   socket.on('bombsAway', (data) => {
       console.log(data.member);
       nukeImg.src = `/assets/nukes/${data.member}.png`
       nuke.style.display = 'flex';
       setTimeout(() => {
           nuke.style.display = 'none';
       }, 5000)
   })
});

var candle = document.getElementById('candle');
var candleOnline = false;

var blowFactor = 0;

var candleAbraTimout1;
var candleAbraTimout2;

var hasWon = false;
var blowTag = document.getElementById('blow');
var blowOnline = false;

function showBlow() {
    if (!hasWon) {
        blow.style.display = 'block';
        setTimeout(() => {
            blow.style.display = 'none';
        },  3000)
        setTimeout(showBlow, 15000);
    } else {
        setTimeout(showBlow, 4000);
    }
}

setTimeout(showBlow, 1000);

function candleAbra() {
    if (hasWon) {
        return;
    }
    candle.style.top = (Math.random() * ((window.innerHeight - 150) - 100) + 100) + 'px';
    candle.style.left = Math.random() > 0.5 ? (Math.random() * ((window.innerWidth - 50) - ((window.innerWidth / 2) + 50)) + ((window.innerWidth / 2) + 50)) + 'px' : (Math.random() * (((window.innerWidth / 2) - 50) - 50) + 50) + 'px';
    candleOnline = true;
    candle.style.display = 'inline-block';
    candleAbraTimout1 = setTimeout(() => {
        if (candle.classList.contains('jiggler')) {
            candle.classList.remove('jiggler');
        }
        if (candle.classList.contains('epicJig')) {
            candle.classList.remove('epicJig');
        }
        if (lips.classList.contains('blower')) {
            lips.classList.remove('blower');
        }
        if (lipsx.classList.contains('blower')) {
            lipsx.classList.remove('blower');
        }
        candle.style.display = 'none';
        blowFactor = 0;
        progress.style.width = '0px';
        candleOnline = false;
        candleAbraTimout2 = setTimeout(candleAbra, Math.random() * (2000 - 1000) + 1000)
    }, Math.random() < 0.43 ? Math.random() * (5000 - 4500) + 4500 : Math.random() < 0.33 ? Math.random() * (6000 - 5000) + 5000 : Math.random() * (3000 - 2000) + 2000)
}

setTimeout(candleAbra, 2000);

var claimYourPrizeWrap = document.getElementById('prizeWrap');
var candleNoise = document.getElementById('goodCandle');
var claimButton = document.getElementById('claimButton');


function blowOut() {
    if (candleAbraTimout1) {
        window.clearTimeout(candleAbraTimout1);
    }
    if (candleAbraTimout2) {
        window.clearTimeout(candleAbraTimout2);
    }
    hasWon = true;
    blow.style.display = 'none';
    lips.style.display = 'none';
    lipsx.style.display = 'none';
    candle.style.display = 'none';
    claimYourPrizeWrap.style.display = 'flex';
}

claimButton.addEventListener('click', claimPrize);

function claimPrize() {
    claimButton.style.display = 'none';
    wormVid.play();
    candleNoise.play();
}

wormVid.onended = function() {
    if (hasWon) {
        candleNoise.pause();
        claimYourPrizeWrap.style.display = 'none';
        claimButton.style.display = 'block';
        hasWon = false;
        if (candle.classList.contains('jiggler')) {
            candle.classList.remove('jiggler');
        }
        if (lips.classList.contains('blower')) {
            lips.classList.remove('blower');
        }
        if (lipsx.classList.contains('blower')) {
            lipsx.classList.remove('blower');
        }
        if (candle.classList.contains('epicJig')) {
            candle.classList.remove('epicJig');
        }
        candle.style.display = 'none';
        setTimeout(candleAbra, 500);
    }
}

var claimYourPrizeWrapFake = document.getElementById('prizeWrapFake');
var candleNoiseFake = document.getElementById('badCandle');
var claimButtonFake = document.getElementById('claimButtonFake');
var kidVid = document.getElementById('kidVid');

function blowBad() {
    if (candleAbraTimout1) {
        window.clearTimeout(candleAbraTimout1);
    }
    if (candleAbraTimout2) {
        window.clearTimeout(candleAbraTimout2);
    }
    hasWon = true;
    blow.style.display = 'none';
    lips.style.display = 'none';
    lipsx.style.display = 'none';
    candle.style.display = 'none';
    claimYourPrizeWrapFake.style.display = 'flex';
}

claimButtonFake.addEventListener('click', claimFakePrize);

function claimFakePrize() {
    claimButtonFake.style.display = 'none';
    kidVid.play();
    candleNoiseFake.play();
}

kidVid.onended = function() {
    if (hasWon) {
        candleNoiseFake.pause();
        claimYourPrizeWrapFake.style.display = 'none';
        claimButtonFake.style.display = 'block';
        hasWon = false;
        if (candle.classList.contains('jiggler')) {
            candle.classList.remove('jiggler');
        }
        if (lips.classList.contains('blower')) {
            lips.classList.remove('blower');
        }
        if (lipsx.classList.contains('blower')) {
            lipsx.classList.remove('blower');
        }
        if (candle.classList.contains('epicJig')) {
            candle.classList.remove('epicJig');
        }
        candle.style.display = 'none';
        setTimeout(candleAbra, 500);
    }
}

var lips = document.getElementById('lips');
var lipsx = document.getElementById('lipsx');
var lipsMoving = false;

var side = null;

document.addEventListener('touchstart', e => {
    if (hasWon) {
        return;
    }
    lipsMoving = true;
});

document.addEventListener('touchmove', e => {
    if (hasWon) {
        return;
    }
    if (lipsMoving && e.touches[0].pageX > (window.innerWidth / 2)) {
        side = 'right';
        lips.style.display = 'none';
        lipsx.style.display = 'inline-block';
        lipsx.style.left = e.touches[0].pageX - 120 + 'px';
        lipsx.style.top = e.touches[0].pageY - 80 + 'px';
    } else if (lipsMoving && e.touches[0].pageX < (window.innerWidth / 2)) {
        side = 'left';
        lipsx.style.display = 'none';
        lips.style.display = 'inline-block';
        lips.style.left = e.touches[0].pageX + 20 + 'px';
        lips.style.top = e.touches[0].pageY - 80 + 'px';
    }
}, true);

document.addEventListener('touchend', e => {
    if (hasWon) {
        return;
    }
    lipsMoving = false;
    side = null;
    blowFactor = 0;
    progress.style.width = '0px';
    lipsx.style.display = 'none';
    lips.style.display = 'none';
    lips.style.left = '-350px';
    lips.style.top = '-350px';
    if (candle.classList.contains('jiggler')) {
        candle.classList.remove('jiggler');
    }
    if (lips.classList.contains('blower')) {
        lips.classList.remove('blower');
    }
    if (lipsx.classList.contains('blower')) {
        lipsx.classList.remove('blower');
    }
    if (candle.classList.contains('epicJig')) {
        candle.classList.remove('epicJig');
    }
});

var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 1;
camera.position.z = 4;

// RENDERER
var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

// LIGHT
var xVarLight = 0;
var xVarLightToggle = true;
var yVarLight = 0;
var yVarLightToggle = false;
var zVarLight = 0;
var zVarLightToggle = false;

var light = new THREE.PointLight(0xffffff, 2.5, 14, 0.95);
light.position.set(0, 0.2, 1);
light.castShadow = true;
scene.add(light);

var wormChamber; // global variable for the wormChamber

var mtlLoader = new THREE.MTLLoader(); // load the first obj
mtlLoader.setPath( "/wp/assets/" );
mtlLoader.load( 'wormRoomX3.mtl', function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "/wp/assets/" );

    objLoader.load( 'wormRoomX3.obj', function ( object ) {

        wormChamber = object;  // global obj var = new object

        wormChamber.position.z = 1;
        wormChamber.position.y = 1;

        wormChamber.traverse(node => { // traverse and allow shadows
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
            wormChamber.needsUpdate = true;
        });
        wormChamber.scale.set(5, 5, 5);
        scene.add(wormChamber); // add obj to the scene
    });
});

controls.update();

var flikring = false;

function flikr() {
    flikring = true;
    setTimeout(() => {
        flikring = false;
        setTimeout(flikr, Math.random() * (16000 - 7000) + 7000);
    }, Math.random() * (600 - 300) + 300);
}

setTimeout(flikr, 3000);

var animate = function () {
    requestAnimationFrame( animate );

    // lets animate this light
    if (light) {
        if (xVarLightToggle && xVarLight < 0.011) {
            xVarLight = xVarLight + 0.0001;
            if (xVarLight > 0.01) {
                xVarLightToggle = false;
            }
        } else if (!xVarLightToggle && xVarLight > - 0.011) {
            xVarLight = xVarLight - 0.0001;
            if (xVarLight < -0.01) {
                xVarLightToggle = true;
            }
        }
        if (yVarLightToggle && yVarLight < 0.011) {
            yVarLight = yVarLight + 0.0001;
            if (yVarLight > 0.01) {
                yVarLightToggle = false;
            }
        } else if (!yVarLightToggle && yVarLight > - 0.011) {
            yVarLight = yVarLight - 0.0001;
            if (yVarLight < -0.01) {
                yVarLightToggle = true;
            }
        }
        if (zVarLightToggle && zVarLight < 0.011) {
            zVarLight = zVarLight + 0.0001;
            if (zVarLight > 0.01) {
                zVarLightToggle = false;
            }
        } else if (!zVarLightToggle && zVarLight > - 0.011) {
            zVarLight = zVarLight - 0.0001;
            if (zVarLight < -0.01) {
                zVarLightToggle = true;
            }
        }
        light.position.set(light.position.x + xVarLight, light.position.y + yVarLight, light.position.z + zVarLight);
        if (flikring) {
            light.intensity = Math.random() * (2.6 - 2.4) + 2.4;
        } else {
            light.intensity = 2.5;
        }
    }

    if (candleOnline && !hasWon) {
        var candleRect = candle.getBoundingClientRect();
        var lipsRect = lips.getBoundingClientRect();
        var lipsxRect = lipsx.getBoundingClientRect();

        if ((lipsRect.top > candleRect.top && lipsRect.bottom < candleRect.bottom) || (lipsxRect.top > candleRect.top && lipsxRect.bottom < candleRect.bottom)) {
            if (blowFactor > 100) {
                if (candle.classList.contains('jiggler')) {
                    candle.classList.remove('jiggler');
                }
                if (!candle.classList.contains('epicJig')) {
                    socket.emit('toripoints', 10);
                    candle.classList.add('epicJig');
                }
            } else {
                if (candle.classList.contains('epicJig')) {
                    candle.classList.remove('epicJig');
                }
                if (!candle.classList.contains('jiggler')) {
                    candle.classList.add('jiggler');
                }
            }
            if (!lips.classList.contains('blower')) {
                lips.classList.add('blower');
            }
            if (!lipsx.classList.contains('blower')) {
                lipsx.classList.add('blower');
            }
            blowFactor += 1.1;
            progress.style.width = progress.width + (window.innerWidth / 182) + 'px';
            if (blowFactor > 200) {
                if (Math.random() > 0.5){
                    blowOut();
                } else {
                    blowBad();
                }
            }
         } else {
            if (candle.classList.contains('jiggler')) {
                candle.classList.remove('jiggler');
            }
            if (candle.classList.contains('epicJig')) {
                candle.classList.remove('epicJig');
            }
            if (lips.classList.contains('blower')) {
                lips.classList.remove('blower');
            }
            if (lipsx.classList.contains('blower')) {
                lipsx.classList.remove('blower');
            }
            blowFactor = 0;
            progress.style.width = '0px';
        }


    }

	controls.update();

    renderer.render(scene, camera);
};

animate();
