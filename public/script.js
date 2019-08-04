console.log('AVATAR SELECTA');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

// document.body.addEventListener('click', e => console.log(e.target));

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var uVizAd = document.getElementById('capita');
var avatarHeads = document.getElementsByClassName('avatarHead');
var avatarName = document.getElementById('avatarName');

// var socket = io.connect('http://192.168.1.226:8080'); //studio
var socket = io.connect('http://192.168.4.1:8080'); //ultraPi

socket.on('connect', function(data) {
   socket.emit('join', {who: 'selecta'});

   socket.on('allIsFuked', data => {
       console.log(data.who, ' pwns all');
   });

   socket.on('timeForAd', () => {
       uVizAd.classList.add('adTime');
       setTimeout(() => {
           uVizAd.classList.remove('adTime');
       }, 6000);
   });
});

for (var i = 0; i < avatarHeads.length; i++) {
    avatarHeads[i].addEventListener('click', e => {
        changeAvatar(e.target.alt)
    });
}

var currentlySelected = {
    name: 'james',
    index: 0
};

function changeAvatar(who) {
    var index = who === 'james' ? 0 : who === 'grant' ? 1 : who === 'tori' ? 2 : 3;
    avatarName.innerText = who;
    avatarHeads[currentlySelected.index].classList.remove('selectedHead');
    avatarHeads[index].classList.add('selectedHead');
    new Promise((resolve, reject) => {
        document.getElementsByTagName('canvas')[0].style.left = '-100vw';
        setTimeout(() => {
            if (currentlySelected.name === 'james') {
                scene.remove(james);
            } else if (currentlySelected.name === 'grant') {
                scene.remove(grant);
            } else if (currentlySelected.name === 'tori') {
                scene.remove(tori);
            } else {
                scene.remove(ian);
            }
            console.log('jump to right');
            document.getElementsByTagName('canvas')[0].style.transition = '';
            document.getElementsByTagName('canvas')[0].style.left = '100vw';
            currentlySelected = {name: who, index: index};
            resolve();
        }, 450);
    }).then(() => {
        setTimeout(() => {
        if (currentlySelected.name === 'james') {
            scene.add(james);
        } else if (currentlySelected.name === 'grant') {
            scene.add(grant);
            grant.position.set(-0.3, 1.3, -10);
        } else if (currentlySelected.name === 'tori') {
            scene.add(tori);
            tori.position.set(-0.4, -1, -1);
        } else {
            scene.add(ian);
            ian.position.set(-0.3, -0.85, -0.5);
        };
            console.log('pulling left');
            document.getElementsByTagName('canvas')[0].style.transition = 'left 0.4s linear';
            document.getElementsByTagName('canvas')[0].style.left = '0';
        }, 350);
    });
}


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 2.5;

var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#fff", 0);

renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.gammaOutput = true;
// renderer.gammaFactor = 5.3;

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight.position.set(1, 2, 5);
scene.add( directionalLight );

var james, grant, tori, ian;

var loader = new THREE.OBJLoader();

loader.load(
	`assets/avatarSelecta/jModel.obj`,
	function (object) {
        james = object;
		scene.add(james);
        james.position.set(-0.3, -0.7, 0);
	},
	function (xhr) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

loader.load(
	`assets/avatarSelecta/gModelZ.obj`,
	function (object) {
        grant = object;
	},
	function (xhr) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

loader.load(
	`assets/avatarSelecta/tModel.obj`,
	function (object) {
        tori = object;
	},
	function (xhr) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

loader.load(
	`assets/avatarSelecta/iModel.obj`,
	function (object) {
        ian = object;
	},
	function (xhr) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

var render = function () {
    requestAnimationFrame( render );

    if (james) {
        james.rotation.y += 0.01;
    }
    if (grant) {
        grant.rotation.y += 0.01;
    }
    if (tori) {
        tori.rotation.y += 0.01;
    }
    if (ian) {
        ian.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

render();
