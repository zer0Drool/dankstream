console.log('james');

// window.onerror = function(msg, url, linenumber) {
//     alert('FUCKING ERROR - msg ', msg, ' - url ', url, ' - linenumber ', linenumber);
//     return true;
// }

if (location.protocol != 'http:') {
    location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

// var socket = io.connect('http://192.168.1.226:8080'); //studio
// var socket = io.connect('http://192.168.4.1:8080'); //ultraPi
var socket = io.connect('http://192.168.1.234:8080'); //ts

//declarations
var tButton = document.getElementById('t-button');
var uVizAd = document.getElementById('capita');

socket.on('connect', function(data) {
   socket.emit('join', {who: 1});

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
       socket.emit('leaving', {who: 1});
   })
});

tButton.addEventListener('click', () => {
    socket.emit('throwingShade', {who: 5});
});

var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 2;
camera.position.z = 18;

// RENDERER
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// LIGHT
var light = new THREE.DirectionalLight( 0xffffff, 1, 50 );
light.position.set(0.9, 0.7, 1.2);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

// FLOOR

var envArray = []; // array for all env textures;
var objForEnvArray = {};

var floorGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
var fTexture = new THREE.TextureLoader().load('dbtk/assets/f1.jpg');
objForEnvArray.f = fTexture;
var floorMaterial = new THREE.MeshLambertMaterial({
    map: fTexture,
    side: THREE.DoubleSide
});

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotateX(Math.PI / 2);
floor.position.y = -5;
floor.castShadow = true;
floor.receiveShadow = true;
scene.add(floor);


// WALL
var wallGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
var wTexture = new THREE.TextureLoader().load('dbtk/assets/w1.jpg');
objForEnvArray.w = wTexture;
var wallMaterial = new THREE.MeshLambertMaterial({
    map: wTexture
});

var wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.z = -10;
wall.position.y = 5;
wall.castShadow = true;
wall.receiveShadow = true;
scene.add(wall);

envArray.push(objForEnvArray);

// COFFIN
var massObjArray = []; // array to store all the loaded coffin objs

var deadBoyTheKidCoffin; // global variable for the currently selected coffin

var mtlLoader = new THREE.MTLLoader(); // load the first obj
mtlLoader.setPath( "dbtk/assets/" );
mtlLoader.load( 'x1.mtl', function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "dbtk/assets/" );

    objLoader.load( 'x1.obj', function ( object ) {

        massObjArray.push(object); // pushes the newly loaded obj to massObjArray

        deadBoyTheKidCoffin = object;  // global obj var = new object

        deadBoyTheKidCoffin.position.z = 1;
        deadBoyTheKidCoffin.position.y = 1;

        deadBoyTheKidCoffin.traverse(node => { // traverse and allow shadows
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
            deadBoyTheKidCoffin.needsUpdate = true;
        });
        scene.add(deadBoyTheKidCoffin); // add obj to the scene
    });
});

var objToggle = 1; // currently selected obj
var objMax = 3; // maximum number of objs

var globalRotation; // keeps track of the rotation

var changeButton = document.getElementById('dX');
changeButton.addEventListener('click', changeObj);

function changeObj() { // change the obj

    if (deadBoyTheKidCoffin) { // check to see if it exists

        objToggle = objToggle === 3 ? 1 : objToggle + 1; // increments obj toggle

        globalRotation = deadBoyTheKidCoffin.rotation.y; // assign the current rotation of the obj to global var

        if (massObjArray.length < objMax) { // if we havent loaded all of the objs yet

            scene.remove(deadBoyTheKidCoffin); // remove curr obj

            deadBoyTheKidCoffin = null;

            var mtlLoader = new THREE.MTLLoader(); // load new one
            mtlLoader.setPath("dbtk/assets/");
            mtlLoader.load(`x${objToggle}.mtl`, function(materials) {

                materials.preload();

                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath("dbtk/assets/");
                objLoader.load(`x${objToggle}.obj`, function (object) {

                    massObjArray.push(object); // push new obj to massObjArray
                    deadBoyTheKidCoffin = object; // asign the new obj to obj global var
                    deadBoyTheKidCoffin.position.z = 1;
                    deadBoyTheKidCoffin.position.y = 1;
                    deadBoyTheKidCoffin.rotation.y = globalRotation; // set the rotation to the value of the lasts objs rotation val
                    deadBoyTheKidCoffin.traverse(node => {
                        if (node instanceof THREE.Mesh) {
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    })
                    scene.add(deadBoyTheKidCoffin); // add new obj
                });
            });
        } else { // if have loaded all of the obj / now we dont need to load any more
            globalRotation = deadBoyTheKidCoffin.rotation.y;
            scene.remove(deadBoyTheKidCoffin);
            deadBoyTheKidCoffin = massObjArray[objToggle -1];
            deadBoyTheKidCoffin.rotation.y = globalRotation;
            scene.add(deadBoyTheKidCoffin)
        }
    }
}

var arrayOfColours = [
    'FF1493', 'C71585', 'FF7F50', 'FF4500', 'FFA500', 'FFFF00',
    'BDB76B', 'E6E6FA', 'BA55D3', '8B008B', '4B0082', '6A5ACD',
    'ADFF2F', '98FB98', '00FF7F', '9ACD32', '20B2AA', '00FFFF',
    '7FFFD4', '4682B4', '87CEFA', '4169E1', '0000CD', '191970',
    'FFEBCD', 'DEB887', 'BC8F8F', 'F4A460', 'DAA520', 'D2691E',
    'A0522D', 'A52A2A', '800000', 'F0FFF0', 'F0FFFF', 'F5F5DC',
    'FFFFF0', 'FAF0E6', 'FFE4E1', 'FFF0F5', 'F5F5F5', 'DCDCDC',
    '808080', '696969', '778899', '2F4F4F', '000000', 'FFFFFF'
];

var changeSymbolButton = document.getElementById('dZ');
changeSymbolButton.addEventListener('click', changeSymbol);

function changeSymbol() {
    if (deadBoyTheKidCoffin) {
        deadBoyTheKidCoffin.traverse(node => {
            if (node instanceof THREE.Mesh && node.name.search('symbol') > -1) {
                node.material.color.setHex(`0x${arrayOfColours[Math.floor(Math.random() * arrayOfColours.length)]}`); // randomly assign a diffuse colour
                node.material.specular.setHex(`0x${arrayOfColours[Math.floor(Math.random() * arrayOfColours.length)]}`); // randomly assign a specular colour
            }
        });
    }
}

var envToggle = 1;
var envMax = 4;

var changeEnvButton = document.getElementById('dQ');
changeEnvButton.addEventListener('click', changeEnv);

function changeEnv() {
    envToggle = envToggle === 4 ? 1 : envToggle + 1;
    var newFTexture;
    var newWTexture;
    if (envArray.length < envMax) { // haven't loaded all the textures
        var newTextureObj = {};
        newFTexture = new THREE.TextureLoader().load(`dbtk/assets/f${envToggle}.jpg`);
        newTextureObj.f = newFTexture;
        newWTexture = new THREE.TextureLoader().load(`dbtk/assets/w${envToggle}.jpg`);
        newTextureObj.w = newWTexture;
        envArray.push(newTextureObj);
    } else { // have loaded
        newFTexture = envArray[envToggle - 1].f;
        newWTexture = envArray[envToggle - 1].w;
    }
    floor.material.map = newFTexture;
    wall.material.map = newWTexture;
}

var lightning = false;
var lightningTrigger = false;

function lightningX() {
    lightning = true;
    document.getElementsByTagName('canvas')[0].style.background = 'linear-gradient(black, black)'; // lights out
    setTimeout(() => {
        lightning = false;
        light.intensity = 0.1;
        lightningTrigger = true;
        document.getElementsByTagName('canvas')[0].style.background = 'linear-gradient(black, black, black, purple, red)'; // lights on
        setTimeout(lightningX,  (Math.random() * (25000 - 15000) + 15000));
    }, Math.random() * (2000 - 1200) + 1200);
}

lightningX();

var animate = function () {
    requestAnimationFrame( animate );
    if (deadBoyTheKidCoffin) {
        deadBoyTheKidCoffin.rotation.y += 0.01;
    }
    if (lightning) {
        light.intensity = Math.random() * (1.9 - 0.02) + 0.02;
        document.getElementById('nofear').style.opacity = Math.random() * (0.6 - 0) + 0;
    } else {
        if (lightningTrigger === true) {
            document.getElementById('nofear').style.opacity = 0;
            light.intensity = light.intensity + 0.01;
            if (light.intensity >= 1) {
                lightningTrigger = false;
            }
        }
    }
    renderer.render(scene, camera);
};

animate();
