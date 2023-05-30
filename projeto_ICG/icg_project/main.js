import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';
import { SpotLightHelper } from 'three';
import sky from '/assets/sky.jpeg';




const ladyski = new GLTFLoader();
const snowy = new GLTFLoader();
const road = new GLTFLoader();
const wood = new GLTFLoader();
const snow_ground = new GLTFLoader();
const campfire = new GLTFLoader();
const cars = new GLTFLoader();
const tower = new GLTFLoader();
const finish = new GLTFLoader();
const rocks = new GLTFLoader();
const barrier = new GLTFLoader();
const tent = new GLTFLoader();
const sol = new GLTFLoader();
const wall = new GLTFLoader();
const mountain = new GLTFLoader();








init();
let ladyskiModel;


function init(){ 



 
 // Set up the scene
 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera.position.set(0, 10, 50);


 const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(sky);

 // camera controls
 
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 
 renderer.setClearColor(0xadd8e6);

 document.body.appendChild(renderer.domElement);

 // sun

 


 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xeead2d, 2)
    directionalLight.color.set(0xffffff);
    directionalLight.intensity = 2;
    directionalLight.castShadow = true;
    directionalLight.angle = 5;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height= 2048;
    directionalLight.position.set(-10,20,-30);
  const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
  scene.add(helper);
  scene.add(directionalLight);

  
  const solTarget = new THREE.Object3D();
  solTarget.position.set(0,5,0)
  scene.add(solTarget);
  directionalLight.target = solTarget;

  
 //snow
 var flakeCount = 20000;
 var flakeGeometry = new THREE.TetrahedronGeometry(0.035); // radius
 var flakeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
 var snow = new THREE.Group();

 for (let i = 0; i < flakeCount; i++) {
 var flakeMesh = new THREE.Mesh(flakeGeometry, flakeMaterial);
 flakeMesh.position.set(
     (Math.random() - 0.5) * 100,
     (Math.random() - 0.5) * 40,
     (Math.random() - 0.5) * 75
 );
 snow.add(flakeMesh);
 }
 
 scene.add(snow);

 var flakeArray = snow.children;

 //cable car line
 // Create a line between the two mountains
 const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
 const points = [];
 points.push( new THREE.Vector3( -20, 3, -19 ) );
 points.push( new THREE.Vector3( 15, -1, 35 ) );
 const geometry = new THREE.BufferGeometry().setFromPoints( points );
 const line = new THREE.Line( geometry, material );
 scene.add( line );

 // Add orbit controls to the camera
 var controls = new OrbitControls(camera, renderer.domElement);


 


  
  



  const skistart = new THREE.Vector3(-25,-13.7,16);
  const skiend = new THREE.Vector3(25,-13.7,16);
  
   ladyski.load("assets/skiing_lady/scene.gltf", function(gltf){
     ladyskiModel = gltf.scene;
     scene.add(ladyskiModel)
    ladyskiModel.scale.set(1,1,1)
    ladyskiModel.position.copy(skistart)
    ladyskiModel.rotation.set(0,1.9,0)
   });
  document.addEventListener("keydown", onDocumentKeyDown, false);

  function onDocumentKeyDown(event) {
    const keyCode = event.which;
    switch(keyCode) {
      case 37: // left arrow
        ladyskiModel.position.x -= 1;
        break;
      case 38: // up arrow
        ladyskiModel.position.z -= 1;
        break;
      case 39: // right arrow
        ladyskiModel.position.x += 1;
        break;
      case 40: // down arrow
        ladyskiModel.position.z += 1;
        break;
    }
  }
  
  



  // Define the two points
const startPosition = new THREE.Vector3(-20, 0, -19);
const endPosition = new THREE.Vector3(15, -3, 35);

// Define the teleferico model
const teleferico = new GLTFLoader();
teleferico.load("assets/teleferico/scene.gltf", function(gltf){
  const model = gltf.scene;
  scene.add(model);
  model.scale.set(1,1,1);
  model.position.copy(startPosition);
  model.rotation.set(0,2.15,0);

  // Define the animation loop
  const duration = 20000; // Duration of one back-and-forth animation cycle in ms
  let startTime = null;
  function animateTeleferico(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime) % duration / duration; // Progress through the animation cycle as a value between 0 and 1
    const position = new THREE.Vector3().lerpVectors(startPosition, endPosition, progress); // Interpolate between the start and end positions
    model.position.copy(position);
    requestAnimationFrame(animateTeleferico);
  }

  // Start the animation loop
  requestAnimationFrame(animateTeleferico);
});



 

   snow_ground.load("assets/patch_of_old_snow/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(80,50,50)
    model.position.set(-15,-16,-4)
    model.rotation.set(0,0,0)
   });

   tower.load("assets/watch_tower/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.013,0.013,0.013)
    model.position.set(-32,-16.5,-19)
    model.rotation.set(0,4,0)
   });

   mountain.load("assets/snow_mountain/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.scale.set(0.4,0.4,0.4);
    model.position.set(-35,-16.5,-5);
    model.rotation.set(0,-2.6,0);
  });

   sol.load("assets/sun/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.5,0.5,0.5)
    model.position.set(-10,20,-30)
    model.rotation.set(0,1.9,0)
   });

  
 
   



  const models = [];
  let x = 15;
  let m = 15;
  let b = 15;

//   barrier.load("assets/psx_style_jersey_barrier/scene.gltf", function(gltf){
//     for (let i = 0; i < 38; i++) {
//         const model = gltf.scene.clone();
//         model.scale.set(1,1,1);
//         const y = b--;
//         model.position.set(y,-13.5,21);
//         model.rotation.set(0, 1.6, 0);
//         models.push(model);
//         scene.add(model);
//     }
//     for (let i = 0; i <48; i++) {
//       const model = gltf.scene.clone();
//       model.scale.set(1,1,1);
//       const y = b++;
//       model.position.set(y,-13.5,21);
//       model.rotation.set(0, 1.6, 0);
//       models.push(model);
//       scene.add(model);
//   }
// });
  


  road.load("assets/snowy_road/scene.gltf", function(gltf){
      for (let i = 0; i < 58; i++) {
          const model = gltf.scene.clone();
          model.scale.set(2, 2, 2);
          const y = x--;
          model.position.set(y,-14.5,23);
          model.rotation.set(0, 1.6, 0);
          models.push(model);
          scene.add(model);
      }
      for (let i = 0; i <75; i++) {
        const model = gltf.scene.clone();
        model.scale.set(2, 2, 2);
        const y = x++;
        model.position.set(y,-14.5,23);
        model.rotation.set(0, 1.6, 0);
        models.push(model);
        scene.add(model);
    }
     let z = 23;
      for( let i =0; i < 50;i++){
        const model = gltf.scene.clone();
        model.scale.set(2.2, 2.2, 2.2);
        const y = z--;
        model.position.set(35,-14.5,y);
        model.rotation.set(0, 0, 0);
        models.push(model);
        scene.add(model);

      }
  });

  snowy.load("assets/frozen_lake/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(2.5,2.5,2.5)
    model.position.set(43,-23,-10)
    model.rotation.set(0,0,0.1)
  });

   wood.load("assets/wood_platform/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(7,7,7)
    model.position.set(49,-64,-14)
    model.rotation.set(0,0,0)
    });

    tent.load("assets/day1_tent/scene.gltf", function(gltf){
      const model = gltf.scene;
      scene.add(model)
      model.scale.set(2,2,2)
      model.position.set(44,-14.8,10)
      model.rotation.set(0,-2,0)
      });

    campfire.load("assets/campfire/scene.gltf", function(gltf){
      const model = gltf.scene;
      scene.add(model)
      model.scale.set(0.2,0.2,0.2)
      model.position.set(44,-14.5,15)
      model.rotation.set(0,0,0)
      });




  
  


 

cars.load("assets/car_blue/scene.gltf", function(gltf){
  const model = gltf.scene;
  scene.add(model)
  model.scale.set(80,80,80)
  model.position.set(3,-14.5,23)
  model.rotation.set(0,0,0)

  // Define variables for car movement
  let carSpeed = 0.5; // Adjust the speed as needed
  let carPosition = 0; // Initial position of the car

  function animateCar() {
    carPosition += carSpeed; // Update the car position

    // Translate the car along the z-axis to move it forward
    model.position.x += carSpeed;

    // Reset the car position if it goes beyond a certain threshold
    if (model.position.x > 65) {
      //model.position.x = -20; // Reset to the initial position
      carSpeed=0;
      // You can also randomize the starting position if desired
    }

    requestAnimationFrame(animateCar);
  }

  animateCar(); // Start the car animation loop
});

  finish.load("assets/finish_line/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.5,0.5,0.5)
    model.position.set(0,-14.5,13)
    model.rotation.set(0,-1.66,0)
    });

    

  // mountain.load("assets/mount/scene.gltf", function(gltf){
  //   const model = gltf.scene;
  //   scene.add(model)
  //   model.scale.set(100,100,100)
  //   model.position.set(-10,0,-20)
  //   model.rotation.set(0,0,0)
  //   });


   wall.load("assets/wall_of_ice/scene.gltf", function(gltf) {
    const model = gltf.scene.clone(); // Clone the first model
    const model2 = gltf.scene.clone(); // Clone the second model
    const model3 = gltf.scene.clone(); // Clone the third model
    scene.add(model);
    scene.add(model2);
    scene.add(model3);
    
    // Set properties for the first model
    model.scale.set(1, 1, 1);
    model.position.set(-16, -18, -24);
    model.rotation.set(0, 0, 0);
    
    // Set properties for the second model
    model2.scale.set(1, 1, 1);
    model2.position.set(25, -20, -24);
    model2.rotation.set(0, 0, 0);

    // Set properties for the third model
    model3.scale.set(1, 1, 1);
    model3.position.set(53, -19, -5);
    model3.rotation.set(0, -1.5, 0);
});

 // Create houses
 var houseCount = 3;
 var houseGeometry = new THREE.BoxGeometry(3, 3, 3); // size of house
 var houseMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
 var houses = new THREE.Group();

 for (var i = 0; i < houseCount; i++) {
   var houseMesh = new THREE.Mesh(houseGeometry, houseMaterial);
   houseMesh.position.set(
     (Math.random() - 0.5) * 40,
     -13.5,
     (Math.random() - 0.5) * 40
   );
   houses.add(houseMesh);
 }


 // Render the scene
 var animate = function() {
   requestAnimationFrame(animate);

  
   for (i = 0; i < flakeArray.length / 2; i++) {
       flakeArray[i].rotation.y += 0.01;
       flakeArray[i].rotation.x += 0.02;
       flakeArray[i].rotation.z += 0.03;
       flakeArray[i].position.y -= 0.018;
       if (flakeArray[i].position.y < -4) {
         flakeArray[i].position.y += 10;
       }
     }
     for (i = flakeArray.length / 2; i < flakeArray.length; i++) {
       flakeArray[i].rotation.y -= 0.03;
       flakeArray[i].rotation.x -= 0.03;
       flakeArray[i].rotation.z -= 0.02;
       flakeArray[i].position.y -= 0.016;
       if (flakeArray[i].position.y < -4) {
         flakeArray[i].position.y += 9.5;
       }
   
       snow.rotation.y -= 0.0000005;
     }

   controls.update();
   ladyski.crossOrigin = "anonymous";

   renderer.render(scene, camera);
 };

 animate();
}