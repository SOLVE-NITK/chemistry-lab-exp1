import * as THREE from "three";
import { setSelectedObject } from "../utils/coordinateTrainer.js";

export function setupSelection(camera, renderer, objects) {

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function getMouse(event) {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  renderer.domElement.addEventListener("click", (event) => {
    getMouse(event);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
      const obj = intersects[0].object.parent;

      setSelectedObject(obj);

      console.log("Selected:", obj.name);
    }
  });
}