console.log('tori');

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
// var tButton = document.getElementById('t-button');
var uVizAd = document.getElementById('capita');

socket.on('connect', function(data) {
   socket.emit('join', {who: 3});

   socket.on('yourRekt', data => {
       console.log('getting rekt');
       document.body.classList.add('rekt');
       setTimeout(() => {
           document.body.classList.remove('rekt');
       }, 3100);
   });

   socket.on('allIsFuked', data => {
       console.log(data.who, ' pwns all');
       document.body.classList.add('pwned');
       setTimeout(() => {
           document.body.classList.remove('pwned');
       }, 2100);
   });

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 3});
   })
});

// tButton.addEventListener('click', () => {
//     socket.emit('throwingShade', {who: 7});
// });

var candle = document.getElementById('candle');
var candleOnline = false;

var blowFactor = 0;

var candleAbraTimout1;
var candleAbraTimout2;

var hasWon = false;

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
        if (lips.classList.contains('blower')) {
            lips.classList.remove('blower');
        }
        if (lipsx.classList.contains('blower')) {
            lipsx.classList.remove('blower');
        }
        candle.style.display = 'none';
        blowFactor = 0;
        candleOnline = false;
        candleAbraTimout2 = setTimeout(candleAbra, Math.random() * (2000 - 1000) + 1000)
    }, Math.random() < 0.33 ? Math.random() * (4000 - 3000) + 3000 : Math.random() < 0.33 ? Math.random() * (5000 - 3000) + 3000 : Math.random() * (2000 - 1000) + 1000)
}

setTimeout(candleAbra, 2000);

var claimYourPrizeWrap = document.getElementById('prizeWrap');
var candleNoise = document.getElementById('candleNoise');
var claimButton = document.getElementById('claimButton');
var wormVid = document.getElementById('wormVid');

function blowOut() {
    if (candleAbraTimout1) {
        window.clearTimeout(candleAbraTimout1);
    }
    if (candleAbraTimout2) {
        window.clearTimeout(candleAbraTimout2);
    }
    hasWon = true;
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
        candleAbra();
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
        if (candleRect.right < window.innerWidth / 2) {
            if (side === 'right') {
                if (lipsxRect.top > candleRect.top && lipsxRect.bottom < candleRect.bottom && lipsxRect.left > candleRect.right + 30) {
                    if (!candle.classList.contains('jiggler')) {
                        candle.classList.add('jiggler');
                    }
                    if (!lipsx.classList.contains('blower')) {
                        lipsx.classList.add('blower');
                    }
                    blowFactor++;
                    console.log(blowFactor);
                    if (blowFactor > 200) {
                        blowOut();
                    }
                 } else {
                    if (candle.classList.contains('jiggler')) {
                        candle.classList.remove('jiggler');
                    }
                    if (lipsx.classList.contains('blower')) {
                        lipsx.classList.remove('blower');
                    }
                    blowFactor = 0;
                }
            }
        } else if (candleRect.left >= window.innerWidth / 2){
            if (side === 'left') {
                if (lipsRect.top > candleRect.top && lipsRect.bottom < candleRect.bottom && lipsRect.right < candleRect.left - 30) {
                    if (!candle.classList.contains('jiggler')) {
                        candle.classList.add('jiggler');
                    }
                    if (!lips.classList.contains('blower')) {
                        lips.classList.add('blower');
                    }
                    blowFactor++;
                    console.log(blowFactor);
                    if (blowFactor > 200) {
                        blowOut();
                    }
                 } else {
                    if (candle.classList.contains('jiggler')) {
                        candle.classList.remove('jiggler');
                    }
                    if (lips.classList.contains('blower')) {
                        lips.classList.remove('blower');
                    }
                    blowFactor = 0;
                }
            }
        }
        // console.log(lipsRect.top, candleRect.top);
        // console.log(side);
    }

	controls.update();

    renderer.render(scene, camera);
};

animate();
