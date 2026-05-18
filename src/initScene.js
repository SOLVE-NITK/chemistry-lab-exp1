import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

export function initScene() {
  const CAMERA_PRESETS = {
  labView: {
    pos: [0, -5, 6],
    target: [0, -5, -1]
  }
};


  const container = document.getElementById("canvas-container");
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("#e6ecf3");
  scene.background = new THREE.Color("#f7b11a");
  const camera = new THREE.PerspectiveCamera(
    45, container.innerWidth / container.innerHeight, 0.1, 100
  );
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.position.set(...CAMERA_PRESETS.labView.pos);
  camera.lookAt(...CAMERA_PRESETS.labView.target);
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.innerHTML = ""; // Clear loading text
  container.appendChild(renderer.domElement);

  // 🌟 Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;     // smooth movement
  controls.dampingFactor = 0.05;

  controls.enableZoom = true;        // zoom
  controls.enablePan = true;         // move scene

  controls.minDistance = 2;          // zoom limit (near)
  controls.maxDistance = 20;         // zoom limit (far)

  controls.maxPolarAngle = Math.PI / 2; // prevent going below table

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  light.castShadow = true;

  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(light, ambient);


  //   // Axis (X=red, Y=green, Z=blue)
  // const axes = new THREE.AxesHelper(5);
  // scene.add(axes);

  // // Grid (table reference)
  // const grid = new THREE.GridHelper(10, 10);
  // scene.add(grid);

//   const helper = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1,1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );

// helper.position.set(0,1,0);
// scene.add(helper);

  window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

  return { scene, camera, renderer, controls };
}