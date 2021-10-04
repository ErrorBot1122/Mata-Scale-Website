/* Imports */

import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

/* VARS */

//const THREE = require('three')
//const p5 = require('p5')

var camera, scene, controls, renderer = null; // init null vars


/* Functions */

/*
Values for copyLightMap: (not case-sentitive)

  * force / end / 0 (forces the loop to end when done)
    
  * soft / soft-(force / end) / 1 (forces the loop to end when it finishes lopping thought "copyLights", but makes sure to finnish the loop. TL;DR: Sets "numberOfPoints" to "copyLights"'s length)

  * loop / 2 (go back to beggining copyLights when there are no more values left in it)
*/

/**
 * @param {Number} radius - that radius of the ring
 * @param {Object} [options=] - options
*/

function createLightRing(radius, options) {

  let nopIsDefault = false;

  const defaultOptions = {
    start: 0,
    end: 360,
    copyLights: [],
    color: 0xffffff, // White
    lightType: "PointLight",
    intensity: 1,
    copyLightMap: "loop", // loops the arrays from colors and other values like it
    rotation: new p5.Vector(0, 0, 0),
    target: null,
    quality: 1,
    numberOfPoints: null,
    optionsOverride: false
  }

  // applys the default to options
  options = {...defaultOptions, ...options}

  const copyLightMap = options.copyLightMap.toString().toLowerCase();
  
  // runs only if "numberOfPoints" exists
  if (!options.numberOfPoints) {
    options.numberOfPoints = (options.end - options.start) * options.quality

    nopIsDefault = true;
  }


  // Mode 1 (soft / soft-(force / end) / 1, forces the loop to end when it finishes lopping thought "copyLights", but makes sure to finnish the loop. TL;DR: Sets "numberOfPoints" to "copyLights"'s length)
  if (copyLightMap == '1' || copyLightMap == 'soft' || copyLightMap == 'soft-end' || copyLightMap == 'soft-force') {  
    options.numberOfPoints = options.copyLights.length

    nopIsDefault = true;

    alert(`3: ${options.numberOfPoints}`)

  }

  // updates "quality" to the right value
  options.quality = nopIsDefault ? options.quality : options.numberOfPoints / (options.end - options.start)

  for (let i = options.start; i <= options.end; i++ /*= 1 / options.quality */) {

    alert(i);

    let light;
    let dontCheck = false;
    let realI = 1 / options.quality;


    const x = radius * cos(i);
    const y = radius * sin(i);


    // try to create a light with the spesified type
    try {
      light = new THREE[options.lightType]();
    }
    // if it fails, just use the defult
    catch(err) {
      light = new THREE[defaultOptions.lightType]();
    }

    // sets all posible proprties in the light object to there respctive proprties in options
    for (const lightKey in light) {

      try {

        light[lightKey] = (options[lightKey]) ? options[lightKey] : light[lightKey]
      }
      // do nothing
      catch(err) {}
    }

    // only runs the switch if both "copyLights" has at lest one element and it can run in the first place
    if (options.copyLights[0] && dontCheck) {

      const copyLightMap = options.copyLightMap.toString().toLowerCase();

      alert(`4.3 (${realI}): ${copyLightMap}`)
      switch (copyLightMap) {
        
        // Mode 0 (force / end / 0, forces the loop to end when done)
        case 'force':
        case 'end':
        case '0':
          if (realI < circleLoop) {
            dontCheck = true;
            break;
          }

          light = options.copyLights[realI];
          break;
        
        // Mode 2 (loop / 2, go back to beggining copyLights when there are no more values left in it)
        case 'loop':
        case '2':
          light = options.copyLights[realI % options.copyLights.lenght];
          break;
      }
    
    }

    alert(`4.4 (${realI}): ${optionsOverride}`)

    if (optionsOverride) {

      // sets all posible proprties in the light object to there respctive proprties in options
      for (const lightKey in light) {

        try {

          light[lightKey] = (options[lightKey]) ? options[lightKey] : light[lightKey]

        }
        // do nothing
        catch(err) {}
      }
    }

    // sets the light's position
    light.position.set(x, y, 0);

    // adds the new light to the array
    lights.push(light);
  }
  alert(5)


  return lights;
}


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;   // gets the canvas for later use

  // gets the hight and width of the canvas
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // checks if the renderer needs to be resized
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);   // resizes the render
  }

  return needResize;  // returns the value for later use
}
/* P5 Functions */

function setup() {

  scene = new THREE.Scene();   // Create the scene

  // Creates and inits the render
  renderer = new THREE.WebGLRenderer( { antialias: true } );

  renderer.setClearColor(/*'#333036'*/'#000000');
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Creates and inits the camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  
  camera.position.z = 5;

  //Creates and inits the orbit controls
  controls = new OrbitControls( camera, renderer.domElement );

  controls.enablePan = false;
  controls.enableZoom = false;

  document.body.appendChild( renderer.domElement );  // adds the render to the body

  // Lights
  const ambient = new THREE.AmbientLight( 0xffffff, 0.2 )
  const lights = createLightRing(200);
  

  const planetGeo = new THREE.IcosahedronGeometry();
  const planetMat = new THREE.MeshStandardMaterial( {color: 0xff00ff} );

  const planet = new THREE.Mesh( planetGeo, planetMat );

  // load skybox loader
  {
    const loader = new THREE.TextureLoader();   // creates the loader


    // load the 360 texture
    const texture = loader.load(
      '../assets/images/skyboxs/Milkyway_Galaxy_Skybox_Sphere_Map_8k.webp',
      (texture) => {
        const rt = new THREE.WebGLCubeRenderTarget( texture.image.height );
        rt.fromEquirectangularTexture( renderer, texture );

        scene.background = rt.texture;

        planetMat.envMap = texture;
        planetMat.roughness = 0.5;
        planetMat.metalness = 0.5;

        // adds the "planet" the sean
        scene.add( planet );

      }
    );
  }

  // add the lights
  scene.add( ambient );
  //lights.foreach(light => scene.add( light ));

}

function draw() {

  // updates the renderer if needed
  if (resizeRendererToDisplaySize(renderer)) {

    const canvas = renderer.domElement;   // gets the canves element, again...

    
    camera.aspect = canvas.clientWidth / canvas.clientHeight; // sets the cameras aspect ratio in relation to the canves size

    // updates the camera
    camera.updateProjectionMatrix();
  }

  controls.update();  // updates the controles

  renderer.render(scene, camera);   // renders the scene

}

// "Exposes" the p5 functions so p5 can use them
window.setup = setup;
window.draw = draw;