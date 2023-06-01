import * as THREE from 'three';
import * as YUKA from 'yuka';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';
import { SpotLightHelper } from 'three';
import { SpotLight } from 'three';
import sky from '/assets/snowy_sky.avif';
import night from '/assets/nightsky.jpeg';




const ladyski = new GLTFLoader();
const ladyski2 = new GLTFLoader();
const loader = new GLTFLoader();
const road = new GLTFLoader();
const house = new GLTFLoader();
const baliza = new GLTFLoader();
const campfire = new GLTFLoader();
const airplane = new GLTFLoader();
const tower = new GLTFLoader();
const finish = new GLTFLoader();
const boneco_neve = new GLTFLoader();
const sol = new GLTFLoader();
const wall = new GLTFLoader();
const snowTruck = new GLTFLoader();
const mountain = new GLTFLoader();
const poste_luz = new GLTFLoader();


// snowTruck.load("assets/snow_truck/scene.gltf", function(gltf) {
//   snowTruckModel = gltf.scene;
//   scene.add(snowTruckModel);
//   snowTruckModel.scale.set(0.5, 0.5, 0.5);
//   snowTruckModel.position.set(35, -14.5,20);
//   snowTruckModel.rotation.set(0, 0, 0);
// });


// snow_ball.load("assets/snow_ball/scene.gltf", function(gltf){
//   snow_ball_model = gltf.scene;
//   scene.add(snow_ball_model)
//   snow_ball_model.scale.set(1,1,1)
//   snow_ball_model.position.set(35,-14.5,10)
//   snow_ball_model.rotation.set(0,-1.66,0)
//   // Store the current position of the model
// });
let scene = new THREE.Scene();




function random(min,max){
  return Math.random()*(max-min)+min;

}
class Truck {
  constructor() {
    // Load the truck model
    snowTruck.load("assets/snowplow_truck/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(0.7, 0.7, 0.7);
      gltf.scene.position.set(35, -14, 20);
      gltf.scene.rotation.set(0, 0, 0);

      this.truck = gltf.scene;
      this.speed = {
        vel: 0,
        rot: 0,
      };
    });

    // Initialize key states
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    // Update the key state when a key is pressed
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = true;
    }
  }

  handleKeyUp(event) {
    // Update the key state when a key is released
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = false;
    }
  }

  update() {
    if (this.truck) {
      // Move the truck based on the key states
      if (this.keys.ArrowUp) {
        this.speed.vel = 0.1; // Move forward
      } else if (this.keys.ArrowDown) {
        this.speed.vel = -0.1; // Move backward
      } else {
        this.speed.vel = 0; // Stop moving
      }

      if (this.keys.ArrowLeft) {
        this.speed.rot = 0.05; // Rotate left
      } else if (this.keys.ArrowRight) {
        this.speed.rot = -0.05; // Rotate right
      } else {
        this.speed.rot = 0; // Stop rotating
      }

      // Update position and rotation based on speed
      this.truck.translateZ(this.speed.vel);
      this.truck.rotateY(this.speed.rot);
    }
  }
}

const truck = new Truck();


class Boneco{
  constructor(_scene){
      scene.add(_scene);
      _scene.scale.set(1, 1, 1);
      _scene.position.set(35, -14,random(14,-20))
      _scene.rotation.set(0, 0, 0);

      this.boneco = _scene;

  }
}

async function loadModel(url){
  return new Promise((resolve,reject) => {
      boneco_neve.load(url, (gltf) => {
      resolve(gltf.scene)
    })
    })
  }


let bonecoModel = null

async function createBoneco(){
  if(!bonecoModel){
    bonecoModel= await loadModel("assets/snow_ball/scene.gltf")
    bonecoModel.castShadow = true
  }
  return new Boneco(bonecoModel.clone())
}



// let boneco = new Boneco()

let bonecos = []
const bonecosCount = 10






init();
let ladyskiModel;
let ladyskiModel2;


async function init(){ 
  // let truck_model;
  // let snow_ball_model;


 
 // Set up the scene
 var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera.position.set(0, 10, 50);

 const camera2 = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(-42, 15, -19);
camera2.lookAt(scene.position);

const camera3 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3.position.set(46, -13, 27);
camera3.lookAt(scene.position);

scene.add(camera2);

scene.add(camera3);

// Create a variable to track the active camera
let activeCamera = camera;

// Add the new camera to the scene


// Switch between cameras when 'C' key is pressed
window.addEventListener('keydown', function (e) {
  if (e.key === 'c' || e.key === 'C') {
      activeCamera = camera2;
    }else if(e.key === 'k' || e.key === 'K'){
        activeCamera = camera3;
    }else if(e.key === 'l' || e.key === 'L'){
      activeCamera = camera;
    }
});

 const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(sky);

 // camera controls
 
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 
 renderer.setClearColor(0xadd8e6);

 document.body.appendChild(renderer.domElement);

 // sun

 


 const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
  // const directionalLight = new THREE.DirectionalLight(0xeead2d, 2)
  //   directionalLight.color.set(0xffffff);
  //   directionalLight.intensity = 2;
  //   directionalLight.castShadow = true;
  //   directionalLight.angle = 5;
  //   directionalLight.shadow.mapSize.width = 2048;
  //   directionalLight.shadow.mapSize.height= 2048;
  //   directionalLight.position.set(-10,20,-30);
  // const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
  // scene.add(helper);
  // scene.add(directionalLight);

  const SpotLight = new THREE.SpotLight(0xffffff, 2);
  scene.add(SpotLight);
  SpotLight.position.set(-30,20,40);
  SpotLight.angle = 2;
  // SpotLight.penumbra = 0.05;
  // SpotLight.decay = 2;
  // SpotLight.distance = 100;
  SpotLight.castShadow = true;
  // SpotLight.shadow.mapSize.width = 1024;
  // SpotLight.shadow.mapSize.height = 1024;
  // SpotLight.shadow.camera.near = 40;
  // SpotLight.shadow.camera.far = 100;
  
  const helper = new THREE.SpotLightHelper(SpotLight);
  //scene.add(helper);

  // const solTarget = new THREE.Object3D();
  // solTarget.position.set(0,5,0)
  // scene.add(solTarget);


for(let i=0 ; i<bonecosCount ; i++){
  const boneco = await createBoneco()
  bonecos.push(boneco)
}



  
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
 const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
 const points = [];
 points.push( new THREE.Vector3( -42, 6, -19 ) );
 points.push( new THREE.Vector3( 15, 6, 45 ) );
 const geometry = new THREE.BufferGeometry().setFromPoints( points );
 const line = new THREE.Line( geometry, material );
 scene.add( line );

 // Add orbit controls to the camera
 var controls = new OrbitControls(camera, renderer.domElement);


 ladyski.load("assets/skiing_lady/scene.gltf", function(gltf) {
  ladyskiModel = gltf.scene;
  scene.add(ladyskiModel);
  ladyskiModel.scale.set(1, 1, 1);
  ladyskiModel.position.set(42, -14.5, -10);
  ladyskiModel.rotation.set(0, 0.5, 0);

  //Define variables for car movement
  let carSpeed = 0.5; // Adjust the speed as needed
  let carPosition = 0; // Initial position of the car

  function animateCar() {
    carPosition += carSpeed; // Update the car position

    // Translate the car along the z-axis to move it forward
    ladyskiModel.position.z += carSpeed;

    // Reset the car position if it goes beyond a certain threshold
    if (ladyskiModel.position.z > 25) {
      //model.position.x = -20; // Reset to the initial position
      setTimeout(animateCar, 3000);

      carSpeed=0.5;
      ladyskiModel.position.set(42, -14.5, -10);

      return;
      // You can also randomize the starting position if desired
    }

    requestAnimationFrame(animateCar);
  }

  animateCar(); // Start the car animation loop
});

ladyski2.load("assets/skier/scene.gltf", function(gltf) {
  ladyskiModel2 = gltf.scene;
  scene.add(ladyskiModel2);
  ladyskiModel2.scale.set(0.3,0.3,0.3);
  ladyskiModel2.position.set(47, -15, -10);
  ladyskiModel2.rotation.set(0, 0, 0);

   //Define variables for car movement
   let carSpeed = 0.8; // Adjust the speed as needed
   let carPosition = 0; // Initial position of the car
 
   function animateC() {
     carPosition += carSpeed; // Update the car position
 
     // Translate the car along the z-axis to move it forward
     ladyskiModel2.position.z += carSpeed;
 
     // Reset the car position if it goes beyond a certain threshold
     if (ladyskiModel2.position.z > 25) {
       //model.position.x = -20; // Reset to the initial position
       setTimeout(animateC, 5000);
       carSpeed=0.8;
       ladyskiModel2.position.set(47, -15, -10);

       return;


       // You can also randomize the starting position if desired
     }

 
     requestAnimationFrame(animateC);
   }
   
   animateC(); // Start the car animation loop
});
  // Define the two points
const startPosition = new THREE.Vector3(-42, 3.8, -19);
const endPosition = new THREE.Vector3(15, 3.8, 45);

// Define the teleferico model
const teleferico = new GLTFLoader();
teleferico.load("assets/teleferico/scene.gltf", function(gltf){
  const model = gltf.scene;
  scene.add(model);
  model.scale.set(1,1,1);
  model.position.copy(startPosition);
  model.rotation.set(0,2.6,0);

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

// Create a plane
var planeGeometry = new THREE.PlaneGeometry(130, 65);
var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
plane.position.x = -5;
plane.position.y = -15; // Set the position of the plane
plane.position.z = -5;
plane.receiveShadow = true;
planeGeometry.receiveShadow = true;
planeMaterial.receiveShadow = true;
scene.add(plane);
 // Make the plane receive shadows
  
//  loader.load("assets/coffee_mug/scene.gltf", function(gltf){
//   const model = gltf.scene;
//   scene.add(model)
//   model.scale.set(0.01,0.01,0.01)
//   model.position.set(25,-16,-4)
//   model.rotation.set(0,0,0)
//   model.receiveShadow = true;
//   });

  //  snow_ground.load("assets/patch_of_old_snow/scene.gltf", function(gltf){
  //   const model = gltf.scene;
  //   scene.add(model)
  //   model.scale.set(100,50,50)
  //   model.position.set(-25,-16,-4)
  //   model.rotation.set(0,0,0)
  //  });

   tower.load("assets/watch_tower/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.02,0.02,0.02)
    model.position.set(-42,-16.5,-19)
    model.rotation.set(0,4,0)
   });

   mountain.load("assets/snow_mountain/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.scale.set(0.44,0.44,0.44);
    model.position.set(-43,-16.8,-5);
    model.rotation.set(0,-3.1,0);
  });

   sol.load("assets/sun/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.1,0.1,0.1)
    model.position.set(-10,20,40)
    model.rotation.set(0,1.9,0)
   });

    airplane.load("assets/curtiss/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(0.05,0.05,0.05)
    model.position.set(-60,20,-15)
    model.rotation.set(0,1.9,0)

    let carSpeed = 0.5; // Adjust the speed as needed
    let carPosition = 0; // Initial position of the car

  function animated() {
    carPosition += carSpeed; // Update the car position

    // Translate the car along the z-axis to move it forward
    model.position.x += carSpeed;

    // Reset the car position if it goes beyond a certain threshold
    if (model.position.x > 100) {
      //model.position.x = -20; // Reset to the initial position
      setTimeout(animated, 2000);

      carSpeed=0.5;
      model.position.set(-60,20,-5);
      return;
      // You can also randomize the starting position if desired
    }

    requestAnimationFrame(animated);
  }

  animated(); // Sta
});

   



  
 
   



  const models = [];
  let x = 15;

  road.load("assets/snowy_road/scene.gltf", function(gltf){
      for (let i = 0; i < 58; i++) {
          const model = gltf.scene.clone();
          model.scale.set(2, 2, 2);
          const y = x--;
          model.position.set(y,-14.5,23);
          model.rotation.set(0, 1.6, 0);
          models.push(model);
          scene.add(model);
          model.traverse(function(node){
            if (node.isMesh)
                node.receiveShadow = true;
        })
      }
      for (let i = 0; i <75; i++) {
        const model = gltf.scene.clone();
        model.scale.set(2, 2, 2);
        const y = x++;
        model.position.set(y,-14.5,23);
        model.rotation.set(0, 1.6, 0);
        models.push(model);
        scene.add(model);
        model.traverse(function(node){
          if (node.isMesh)
              node.receiveShadow = true;
      })
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
        model.traverse(function(node){
          if (node.isMesh)
              node.receiveShadow = true;
      })

      }

      let c = 23;
      for( let i =0; i < 50;i++){
        const model = gltf.scene.clone();
        model.scale.set(2.2, 2.2, 2.2);
        const y = c--;
        model.position.set(8,-14.5,y);
        model.rotation.set(0, 0, 0);
        models.push(model);
        scene.add(model);
        model.traverse(function(node){
          if (node.isMesh)
              node.receiveShadow = true;
      })

      }
  });

  const models2 = [];
  let x2 = 15;


  house.load("assets/house/scene.gltf", function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(1,1,1)
    model.position.set(20,-14,-2)
    model.rotation.set(0,-1.59,0)
    model.traverse(function(node){
      if (node.isMesh)
          node.castShadow = true;
  })

});

// baliza.load("assets/football_gate/scene.gltf", function(gltf){
//   const model = gltf.scene.clone();
//   const model2 = gltf.scene.clone();
//   scene.add(model)
//   scene.add(model2)

//   model.scale.set(0.8,0.8,0.8)
//   model.position.set(-4,-14,0)
//   model.rotation.set(0,-1.59,0)

//   model2.scale.set(0.8,0.8,0.8)
//   model2.position.set(-4,-14,15)
//   model2.rotation.set(0,1.59,0)

// });

baliza.load("assets/field/scene.gltf", function(gltf){
  const model = gltf.scene.clone();
  scene.add(model)
  model.scale.set(0.06,0.06,0.06)
  model.position.set(-7,-14,6)
  model.rotation.set(0,0,0)
  model.traverse(function(node){
    if (node.isMesh)
        node.castShadow = true;
        node.receiveShadow = true;
})
});

poste_luz.load("assets/stadium_floodlights/scene.gltf", function(gltf){
  const model = gltf.scene.clone();
  const model2 = gltf.scene.clone();
  const model3 = gltf.scene.clone();

  scene.add(model)
  scene.add(model2)
  scene.add(model3)

  model.scale.set(0.7,0.7,0.7)
  model.position.set(40,-20,-25)
  model.rotation.set(0,0.3,0)

  model.traverse(function(node){
    if (node.isMesh)
        node.castShadow = true;
  })
  
  model2.scale.set(0.7,0.7,0.7)
  model2.position.set(-16,-25,-3)
  model2.rotation.set(0,0.3,0)
  model2.traverse(function(node){
    if (node.isMesh)
        node.castShadow = true;
  })

  model3.scale.set(0.7,0.7,0.7)
  model3.position.set(3,-25,15)
  model3.rotation.set(0,3.5,0)
  model3.traverse(function(node){
    if (node.isMesh)
        node.castShadow = true;
  })
  });




finish.load("assets/finish_line/scene.gltf", function(gltf){
  const model = gltf.scene;
  scene.add(model)
  model.scale.set(0.7,0.7,0.7)
  model.position.set(45,-14.5,23)
  model.rotation.set(0,0,0)
  });



  // snowTruck.load("assets/snowplow_truck/scene.gltf", function(gltf){
  //   truck_model = gltf.scene;
  //   scene.add(truck_model)
  //   truck_model.scale.set(0.7,0.7,0.7)
  //   truck_model.position.set(35,-14.5,20)
  //   truck_model.rotation.set(0,-1.66,0)
  //   // Store the current position of the model
  //   const position = new THREE.Vector3();
  //   position.copy(truck_model.position);
  
  
  // // Variables for movement and rotation
  // let speed = 0.6; // Adjust the movement speed as needed
  // let rotationSpeed = 0.1; // Adjust the rotation speed as needed
  // let keys = []; // Array to store currently pressed keys
  
  // // Handle keydown event
  // const onKeyDown = function(event) {
  //   keys[event.keyCode] = true;
  // };
  
  // // Handle keyup event
  // const onKeyUp = function(event) {
  //   keys[event.keyCode] = false;
  // };
  
  // // Add event listeners for keydown and keyup events
  
    // window.addEventListener('keyup', onKeyUp, false);


  



  
  
  // Render loop
  

// function generateSnowPile() {
//   const geometry = new THREE.SphereGeometry(1, 32, 32);
//   const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
//   const snowPile = new THREE.Mesh(geometry, material);
  
//   // Set random position
//   snowPile.position.x = 35; // Fixed x position
//   snowPile.position.y = -15; // Snow piles will be on the ground
  
//   // Generate random z position within the desired range
//   const zPosition = Math.floor(Math.random() * (23 - 15 + 1)) + 15;
//   snowPile.position.z = zPosition;
  
//   // Set random scale
//   const scale = Math.random() * 2 + 0.5; // Random scale between 0.5 and 2.5
//   snowPile.scale.set(scale, scale, scale);
  
//   // Add the snow pile to the scene
//   scene.add(snowPile);
// }

// // Generate multiple random snow piles with spacing and offset
// function generateRandomSnowPiles(count, spacing, offset) {
//   const startZ = 14; // Starting position in the z-axis
  
//   for (let i = 0; i < count; i++) {
//     generateSnowPile();
    
//     // Apply spacing to the z position of each snow pile
//     const snowPiles = scene.children.filter(obj => obj.type === "Mesh");
//     const currentSnowPile = snowPiles[snowPiles.length - 1];
//     if (i > 0) {
//       const previousSnowPile = snowPiles[snowPiles.length - 2];
//       const previousZ = previousSnowPile.position.z;
//       const currentZ = previousZ - spacing;
//       currentSnowPile.position.z = currentZ;
//     } else {
//       currentSnowPile.position.z = startZ;
//     }
//   }
  
//   // Apply offset to the z position of all snow piles
//   const snowPiles = scene.children.filter(obj => obj.type === "Mesh");
//   snowPiles.forEach((snowPile, index) => {
//     snowPile.position.z -= offset * index;
//   });
// }

// setTimeout(function() {
//   // Call the function to generate 5 random snow piles with spacing of 2 units and an offset of 1 unit
//   generateRandomSnowPiles(10, 2, 1);
// }, 15000);

// function isColliding(object1, object2) {
//   return (
//     Math.abs(object1.position.x - object2.position.x) <15 &&  Math.abs(object1.position.y - object2.position.y) <15 
//   ) 
// }





  // track.load("assets/iglo/scene.gltf", function(gltf){
  //   const model = gltf.scene.clone();
  //   const model2 = gltf.scene.clone();
  //   const model3 = gltf.scene.clone();

  //   scene.add(model)
  //   scene.add(model2)
  //   scene.add(model3)


  //   model.scale.set(1,1,1)
  //   model.position.set(10,-15,-15)
  //   model.rotation.set(0,-0.9,0)

  //   model2.scale.set(1,1,1)
  //   model2.position.set(4,-15,-24)
  //   model2.rotation.set(0,-0.9,0)

  //   model3.scale.set(1,1,1)
  //   model3.position.set(-5,-15,45)
  //   model3.rotation.set(0,-0.9,0)

  //   });

  // var material2 = new THREE.MeshBasicMaterial({ color: 0x000000 });

  // // Create a rectangle geometry
  // var geometry2 = new THREE.BoxGeometry(1, 1, 0.1);

  // // Create multiple yellow rectangles and position them
  // for (var i = 0; i < 17; i++) {
  //   var rectangle = new THREE.Mesh(geometry2, material2);
  //   rectangle.position.x =( i * 2)-10; // Adjust the spacing between rectangles
  //   rectangle.position.y = -15.4; // Position the rectangles on the ground
  //   rectangle.position.z = 14; // Position the rectangles in the z-axis
  //   scene.add(rectangle);
  // }






  

  // race_track.load("/Users/rafaelpereira/Desktop/ICG/projeto_ICG/icg_project/assets/low_poly_winter_village/scene.gltf", function(gltf){
  //   const model = gltf.scene;
  //   scene.add(model)
  //   model.scale.set(0.09,0.09,0.09)
  //   model.position.set(5,-14.5,-15)
  //   model.rotation.set(0,0,0)
  //   });





    

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
    // scene.add(model);
    // scene.add(model2);
    scene.add(model3);
    
    // // Set properties for the first model
    // model.scale.set(1, 1, 1);
    // model.position.set(-16, -18, -24);
    // model.rotation.set(0, 0, 0);
    
    // // Set properties for the second model
    // model2.scale.set(1, 1, 1);
    // model2.position.set(25, -20, -24);
    // model2.rotation.set(0, 0, 0);

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

//  s

function isColliding(object1, object2) {
  return Math.abs(object1.position.x - object2.position.x) < 5 &&
        Math.abs(object1.position.z - object2.position.z) < 5;
}

function checkCollision(){
  bonecos.forEach(boneco => {
    if(isColliding(truck.truck, boneco.boneco)){
      scene.remove(boneco.boneco)
    }
    });
  
}


function animate() {
  // Check which keys are currently pressed and perform corresponding actions
    
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


  console.log('animate')
  truck.update();
  checkCollision();

  // Render the scene
  renderer.render(scene, activeCamera);
  

  // Call animate recursively
  


  // Start the animation loop
  

  };

  renderer.setAnimationLoop(animate);


}