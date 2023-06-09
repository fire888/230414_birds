import {
  scene,
  getControls,
  renderer,
  resize,
  addResize,
  camera,
} from "../modules/renderer.js";
import {
  DirectionalLight,
  HemisphereLight,
  PCFSoftShadowMap,
  sRGBEncoding,
} from "../third_party/three.module.js";
import { createEldritch } from "./eldritch.js";
import { createCurl } from "./curl.js";
import { createCurl as createCurl2 } from "./curl2.js";
import { SSAO } from "./SSAO.js";
import { Post } from "./post.js";
import { clamp } from "../modules/Maf.js";

const ssao = new SSAO();
const post = new Post(renderer);

let update;
let mesh;

const controls = getControls();

renderer.shadowMap.enabled = true;
renderer.outputEncoding = sRGBEncoding;
renderer.shadowMap.type = PCFSoftShadowMap;

const hemiLight = new HemisphereLight(0xe7e9ed, 0x7d828e, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

// const dirLight = new DirectionalLight(0xe0e2e6, 0.5);
// dirLight.position.set(-1, 1.75, 1);
// scene.add(dirLight);

const dirLight = new DirectionalLight(0xe0e2e6, 0.5);
dirLight.position.set(-1, 1.75, 1);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 100;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 4;

renderer.setClearColor(0xffffff, 1);

const fns = [createCurl, createCurl2, createEldritch];
let t = 0;

function randomize() {
  if (mesh) {
    scene.remove(mesh);
    mesh.geometry.dispose();
  }
  const fn = fns[Math.floor(Math.random() * fns.length)];
  const res = fn();
  mesh = res.mesh;
  update = res.update;
  scene.add(mesh);
  mesh.castShadow = mesh.receiveShadow = true;
  t = 0;
}

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyR") {
    randomize();
  }
});

// document.querySelector("#randomizeBtn").addEventListener("click", () => {
//   randomize();
// });

let prevTime = performance.now();

function render() {
  const time = performance.now();
  const dt = time - prevTime;
  prevTime = time;

  t += dt / 500;
  t = clamp(t, 0, 1);
  update(t);

  ssao.render(renderer, scene, camera);
  post.render(ssao.output);
  // renderer.render(scene, camera);
  renderer.setAnimationLoop(render);
}

function myResize(w, h, dPR) {
  ssao.setSize(w, h, dPR);
  post.setSize(w, h, dPR);
}
addResize(myResize);

randomize();
resize();
render();



export const createStudio = (cubeMap) => {


  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 2;
  // controls.maxDistance = 40000;
  // controls.maxPolarAngle = Math.PI / 2 - 0.01
  // controls.target.set(...CAM_TARGET_POS)
  // controls.update();
  //
  //
  // const functionsOmCameraMove = []
  // const spherical = new THREE.Spherical(1., controls.getPolarAngle(), controls.getAzimuthalAngle())
  // const v3Look = new THREE.Vector3()


  return {
    scene,
    addToScene(model) {
      scene.add(model)
    },
    removeFromScene(model) {
      scene.remove(model)
    },
    render () {
      // if (!camera) {
      //   return
      // }
      //
      // if (camera.position.y < 3) {
      //   camera.position.y = 3
      //   controls.update()
      // }
      // if (
      //     spherical.phi !== controls.getPolarAngle() ||
      //     spherical.theta !== controls.getAzimuthalAngle()
      // ) {
      //   spherical.phi = controls.getPolarAngle()
      //   spherical.theta = controls.getAzimuthalAngle()
      //   for (let i = 0; i < functionsOmCameraMove.length; ++i) {
      //     v3Look.setFromSpherical(spherical)
      //     functionsOmCameraMove[i](v3Look)
      //   }
      // }
    },
    setTargetCam: v => {
      //controls.target.set( v.x, v.y, v.z );
      //controls.update();
    },
    resize () {
    },
    onCameraMove: func => {
      //functionsOmCameraMove.push(func)
    },
  }
}

