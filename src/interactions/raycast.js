import * as THREE from "three";

export function setupRaycaster(scene, camera, renderer) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let selectedObject = null;

  function getIntersects(event) {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    return raycaster.intersectObjects(scene.children, true);
  }

  // 🖱️ CLICK
  // renderer.domElement.addEventListener("click", (event) => {
  //   const intersects = getIntersects(event);

  //   if (intersects.length > 0) {
  //     selectedObject = intersects[0].object;

  //     console.log("Selected:", selectedObject);
  //     alert(`Selected: ${selectedObject.name || selectedObject.type}`);
  //     // highlight safely
  //     if (selectedObject.material && selectedObject.material.emissive) {
  //       // selectedObject.material.emissive.set(0x222222);
  //       selectedObject.material.emissive.set(0x440000);
  //     }
  //   }
  // });

  // ✨ HOVER
  renderer.domElement.addEventListener("mousemove", (event) => {
    const intersects = getIntersects(event);

    renderer.domElement.style.cursor =
      intersects.length > 0 ? "pointer" : "default";
  });

  return {
    getSelected: () => selectedObject
  };
}