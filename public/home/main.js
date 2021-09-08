const starAgePallet = [0xafc9ff, 0xc7d8ff, 0xfff4f3, 0xffe5cf, 0xffd9b2, 0xffc78e, 0xffa651];

window.onerror = onErrorHandler

function onErrorHandler(msg, src, line, col, err){
  alert(err.stack);

  return false; 
} 

function log(msg) {
  alert(msg)
}

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#333036");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

const starGeo = new THREE.SphereGeometry(2, 6, 6);
const starMat = new THREE.MeshBasicMaterial({
  color: starAgePallet[Math.round(Math.random() * starAgePallet.length])
});

const sphere = new THREE.Mesh( starGeo, starMat );

scene.add( sphere );


renderer.render(scene, camera)