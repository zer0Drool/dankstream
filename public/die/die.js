if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

var die = document.getElementById('die');
var dieUp = false;

var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
// var socket = io.connect('http://172.20.10.3:8080'); //tsX
// var socket = io.connect('http://192.168.1.234:8080'); //ts
// var socket = io.connect('http://172.20.10.2:8080'); //salazar
// var socket = io.connect('http://172.20.10.4:8080'); //salazarX

socket.on('connect', function(data) {
   socket.emit('join', {who: 10});

   socket.on('lightning', () => {
       console.log('lightning');
       lightningX();
   })

   socket.on('timeToDie', () => {
	   console.log('poop');
	   if (!dieUp) {
		   	console.log('die die ddie');
	   		dieUp = true;
			die.style.display = 'flex';
			setTimeout(() => {
				die.style.display = 'none';
				dieUp = false;
			}, 300000)
	   };
   })

   socket.on('disconnect', () => {
       socket.emit('leaving', {who: 10});
   })
});

// THREE JS =================================================================

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#fff", 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 1.3;

var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
light.position.set(0, 1, 10);
scene.add( light );

var lLight = new THREE.PointLight( 0xffffff, 0, 100 );
// lLight.rotation.y = 6;
// lLight.rotation.x = -10;
lLight.position.set(0, 0, 20);
scene.add( lLight );

var logo;

// var mtlLoader = new THREE.MTLLoader();
var objLoader = new THREE.OBJLoader();

var logoMaterial = new THREE.MeshStandardMaterial({color: 0xaaaaaaa, metalness: 1, roughness: 0.2});
objLoader.load(
	`/die/assets/deadboythekidREAL.obj`,
	function (object) {
        logo = object;
        logo.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = logoMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        logo.scale.set(1.3, 1.3, 1.3);
        scene.add(logo);
	},
	function (xhr) {
		console.log( (xhr.loaded / xhr.total) + ' loaded logo');
	},
	function (error) {
		console.log( 'An error happened' );
	}
);

var lightning = false;
var lightningTrigger = false;

function lightningX() {
    lightning = true;
    setTimeout(() => {
        lightning = false;
        lLight.intensity = 0.1;
        lightningTrigger = true;
        // setTimeout(lightningX,  (Math.random() * (25000 - 15000) + 15000));
    }, Math.random() * (2000 - 1200) + 1200);
}

// lightningX();

var render = function () {
    requestAnimationFrame( render );

    if (logo) {
        logo.rotation.y += 0.005;
    }

    if (lightning) {
        light.intensity = 0;
        lLight.intensity = Math.random() * (200 - 0.02) + 0.02;
        // document.getElementById('nofear').style.opacity = Math.random() * (0.6 - 0) + 0;
    } else {
        lLight.intensity = 0;
        light.intensity = 1.3;
    }

    renderer.render(scene, camera);
};

render();
