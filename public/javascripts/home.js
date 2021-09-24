/* VARS */

// init null vars
let camera, scene, controls, renderer = null

function setup() {

  // Create the scene
  scene = new THREE.Scene();

  // Create and init the render
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor(/*"#333036"*/"#000000");
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Create and init the camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
  camera.position.z = 5;

  // Create the orbitc controls
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  // adds the render to the body
  document.body.appendChild( renderer.domElement );
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// load skybox loader
{
  // creates the loader
  const loader = new THREE.TextureLoader();

  // load the 360 texture
  const texture = loader.load(
    '../assets/images/skyboxs/Milkyway_Galaxy_Skybox_Sphere_Map_8k.webp',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    });
}

function draw() {

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  controls.update();

  renderer.render(scene, camera);
}
