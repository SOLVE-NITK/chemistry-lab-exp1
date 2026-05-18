import * as THREE from "three";

let drops = [];

export function createDrop(scene) {
  const drop = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00aaff })
  );

  drop.position.set(0, 1.2, 0);
  scene.add(drop);

  drops.push(drop);
}

export function updateDrops(scene) {
  drops.forEach((drop, i) => {
    drop.position.y -= 0.05;

    if (drop.position.y < 0) {
      scene.remove(drop);
      drops.splice(i, 1);
    }
  });
}