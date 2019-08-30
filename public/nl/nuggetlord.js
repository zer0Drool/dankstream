console.log('ian');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var messages = document.getElementById('messages');
var write = document.getElementById('write');
var send = document.getElementById('send');
var bombCanv = document.getElementById('bomb-canvas');
bombCanv.width = window.innerWidth;
bombCanv.height = window.innerHeight;
var bombCtx = bombCanv.getContext('2d');
var bubble = document.getElementById('bubble');
var bubbleImg = document.getElementById('bubbleImg');
var textarea = document.getElementsByTagName('textarea')[0];
// var sounds = [];
var sounds = document.getElementsByTagName('audio');

// var bff = new Audio('audio/bff.mp3');
// var blood = new Audio('audio/blood.mp3');
// var eww = new Audio('audio/eww.mp3');
// var heave = new Audio('audio/heave.mp3');
// var hot = new Audio('audio/hot.mp3');
// var sexy = new Audio('audio/sexy.mp3');
// sounds.push(bff, blood, eww, heave, hot, sexy);

messages.style.height = `${window.innerHeight - write.offsetHeight}px`;

var boyfs = ['Chris Zylka', 'Thomas Gross', 'Josh Upshaw', 'River Viiperi', 'Todd Phillips', 'Afrojack', 'Cy Waits', 'Cristiano Ronaldo', 'Doug Reinhardt', 'Benji Madden', 'Jared Leto', '50 Cent', 'Brody Jenner', 'Adam Goldstein', 'Adrian Grenier', 'Tyler Atkins', 'Matt Leinart', 'Josh Henderson', 'Kid Rock', 'Andy Roddick', 'Travis Barker', 'Jamie Kennedy', 'Scott Storch', 'Stavros Niarchos III', 'Paris Latsis', 'Val Kilmer', 'Colin Farrell', 'Simon Rex', 'Chad Muska', 'Jake Sumner', 'Fred Durst', 'Mark Philippoussis', 'Chad Michael Murray', 'Nick Carter', 'Brian Urlacher', 'Deryck Whibley', 'Robert Mills', 'Mark McGrath', 'Vincent Gallo', 'Joe Francis', 'Jason Shaw', 'Rick Salomon', 'Leonardo DiCaprio', 'Oscar de la Hoya', 'Edward Furlong', 'Randy Spelling'];
var imgURLs = ['french.png', 'fight.png', 'cute.png'];
var parisImgDims = [
    {w: 861, h: 1390},
    {w: 500, h: 757},
    {w: 1280, h: 853},
    {w: 768, h: 431},
    {w: 634, h: 883},
    {w: 594, h: 476},
    {w: 318, h: 159},
    {w: 2000, h: 1333},
    {w: 1023, h: 576},
    {w: 769, h: 1222},
    {w: 1024, h: 719},
    {w: 596, h: 482},
    {w: 194, h: 260},
    {w: 1200, h: 1200},
    {w: 183, h: 275},
    {w: 1200, h: 781},
    {w: 480, h: 320},
    {w: 666, h: 1000},
    {w: 588, h: 834},
    {w: 1200, h: 1655},
    {w: 1408, h: 882},
    {w: 1024, h: 576},
    {w: 634, h: 711},
    {w: 600, h: 600},
    {w: 500, h: 500},
    {w: 800, h: 871},
    {w: 2500, h: 1669},
    {w: 1068, h: 713},
    {w: 2700, h: 1800},
    {w: 620, h: 413},
    {w: 600, h: 400},
    {w: 1080, h: 803},
    {w: 709, h: 1024},
    {w: 1440, h: 1096},
    {w: 570, h: 855},
    {w: 866, h: 1390},
    {w: 705, h: 1222},
    {w: 1240, h: 827},
    {w: 698, h: 465},
    {w: 1024, h: 576},
    {w: 620, h: 413},
    {w: 640, h: 640},
    {w: 2500, h: 1669},
    {w: 634, h: 423},
    {w: 1080, h: 1080},
    {w: 1080, h: 1080},
    {w: 1080, h: 1079},
    {w: 1080, h: 1080},
    {w: 1080, h: 1080},
    {w: 591, h: 591}
]

var gotCtx = false;
var ctx;
var bubbleUp = false;
var parisBomb = false;
var parisCount = 0;
var name;

var parisSrcs = [];
var parisObjs = [];
var parisLoader = 0;
var parisLoaded = false;

for (var i = 0; i < 50; i++) {
    parisSrcs.push(`nl/paris_bomb/paris ${i + 1}.jpg`);
    var parisObj = new Image();
    parisObj.src = parisSrcs[i];
    parisObj.onload = function() {
        parisLoader++;
        if (parisLoader === 49) {
            parisLoaded = true;
        }
    }
    parisObjs.push(parisObj);
}

// var socket = io.connect('http://192.168.1.234:8080'); //ts
var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http:///172.20.10.3:8080'); //harlesden

// var tButton = document.getElementById('t-button');
var uVizAd = document.getElementById('capita');

socket.on('connect', () => {
    socket.emit('join', {who: 4});

    socket.on('nuked', data => {
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
        socket.emit('leaving', {who: 4});
    })

    // tButton.addEventListener('click', () => {
    //     socket.emit('throwingShade', {who: 8});
    // });

    name = boyfs[Math.floor(Math.random() * ((boyfs.length - 1) - 0 + 1)) + 0];

    socket.on('getTheMessageNL', data => {
        if (data.name === 'Nugget Lord') {
            if (typeof(data.message) === 'number') {
                if (!bubbleUp) {
                    bubbleUp = data.message;
                    bubbleImg.src = 'nl/parisMessage.png';
                    // bubbleImg.src = imgURLs[data.message - 1];
                    bubble.style.display = 'flex';
                }
            } else if (data.message === 'boom') {
                if (!parisBomb) {
                    parisBomb = true;
                    bombLeGo = setInterval(() => {
                        bombCtx.drawImage(parisObjs[parisCount], 0, 0, parisImgDims[parisCount].w, parisImgDims[parisCount].h, Math.random() * ((window.innerWidth - 100) - 0) + 0, Math.random() * ((window.innerHeight - 100) - 0) + 0, parisImgDims[parisCount].w / 5, parisImgDims[parisCount].h / 5);
                        parisCount += 1;
                        if (parisCount === 49) {
                            clearInterval(bombLeGo);
                            parisCount = 0;
                            bombCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                            parisBomb = false;
                        }
                    }, 100);
                }
            } else {
                createMessage(data.name, data.message);
            }
        } else {
            createMessage(data.name, data.message);
        }
    });
});

function playAudio(num) {
    // var ranNum = Math.floor(Math.random() * (5 - 0) + 0);
    sounds[num].play();
}

function createMessage(name, messageX) {
    // playAudio();
    var message = document.createElement("div");
    var id = document.createElement("p");
    id.innerText = name;
    var text = document.createElement("p");
    text.innerText = messageX;
    message.appendChild(id);
    message.appendChild(text);
    message.classList.add('message');
    if (name === 'Nugget Lord') {
        message.classList.add('lord');
    }
    messages.prepend(message);
}

bubble.addEventListener('click', () => {
    playAudio(bubbleUp);
    setTimeout(() => {
        bubble.style.display = 'none';
        bubbleUp = false;
    }, 2000);
})

send.addEventListener('click', () => {
    if (textarea.value) {
        socket.emit('newMessageNL', {name: name, message: textarea.value});
        createMessage(name, textarea.value);
        textarea.value = '';
    }
})

// THREE JS =================================================================

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#fff", 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 1.3;

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
directionalLight.position.set(1, 2, 5);
scene.add( directionalLight );

var paris;
var nugget;
var pivot;

var mtlLoader = new THREE.MTLLoader();
var objLoader = new THREE.OBJLoader();

// mtlLoader.setResourcePath('Parisobj/');
// mtlLoader.setPath('Parisobj/');
mtlLoader.load('nl/Parisobj/Parisobj.mtl', function(materials) {

    materials.preload();

    objLoader.setMaterials(materials);
    // objLoader.setPath('Parisobj/');
    objLoader.load(
    	'nl/Parisobj/Parisobj.obj',
    	function (object) {
            paris = object;
            // paris.castShadow = true;
            // paris.receiveShadow = true;
            paris.traverse( function( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            paris.scale.set( 0.1, 0.1, 0.1 );
            paris.position.set(0, 0, -13);
            paris.rotation.x = 11;
            paris.rotation.z = 6;
            scene.add(paris);
    	},
    	function (xhr) {
    		console.log( (xhr.loaded / xhr.total) + ' loaded paris');
    	},
    	function (error) {
    		console.log( 'An error happened' );
    	}
    );

},
function (xhr) {
    console.log( (xhr.loaded / xhr.total) + ' loaded material');
},
function (error) {
    console.log( 'An error happened' );
})

var nuggetMaterial = new THREE.MeshStandardMaterial({color: 0xff6500, metalness: 0.5, roughness: 0.8});
objLoader.load(
	`nl/nugget2.obj`,
	function (object) {
        nugget = object;
        nugget.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = nuggetMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        // nugget.castShadow = true;
        // nugget.receiveShadow = true;
        nugget.scale.set(2.7, 2.7, 2.7);
        // nugget.position.set(7, 0, -45);
        nugget.position.x = 27;
        pivot = new THREE.Object3D();
        pivot.add( nugget );
        pivot.position.z = -25;
        scene.add( pivot );
        // scene.add(nugget);
	},
	function (xhr) {
		console.log( (xhr.loaded / xhr.total) + ' loaded nugget');
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

var render = function () {
    requestAnimationFrame( render );

    if (paris) {
        paris.rotation.z -= 0.002;
    }
    if (pivot) {
        pivot.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

render();
