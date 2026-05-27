// 📁 objects/EDTACrystals.js

import * as THREE from "three";
import {createPetriDish} from "./PetriDish.js";
export function createEDTACrystals() {

  const crystalPile = new THREE.Group();

  // =========================================
  // MATERIAL
  // =========================================

  const crystalMaterial = new THREE.MeshPhysicalMaterial({

    color: 0xffffff,

    transmission: 0.25,

    transparent: false,

    roughness: 0.35,

    metalness: 0,

    thickness: 0.2,

    ior: 1.35

  });

  // =========================================
  // CRYSTAL COUNT
  // =========================================

  const count = 3500;

  for (let i = 0; i < count; i++) {

    // =====================================
    // RANDOM GEOMETRY TYPES
    // =====================================

    const geometries = [

      new THREE.TetrahedronGeometry(
        Math.random() * 0.018 + 0.006
      ),

      new THREE.OctahedronGeometry(
        Math.random() * 0.014 + 0.005
      ),

      new THREE.ConeGeometry(
        Math.random() * 0.012 + 0.004,
        Math.random() * 0.03 + 0.01,
        4
      )

    ];

    const geometry =
      geometries[
        Math.floor(Math.random() * geometries.length)
      ];

    const crystal = new THREE.Mesh(
      geometry,
      new THREE.MeshPhysicalMaterial({

    color: 0xffffff
  })
    );

    // =====================================
    // RADIAL MOUND DISTRIBUTION
    // =====================================

    const radius = Math.random() * 0.4;

    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * radius;

    const z = Math.sin(angle) * radius;

    // mound height
    const maxHeight = 0.25;

    const y =
      (1 - radius / 0.6) * maxHeight * Math.random();

    crystal.position.set(x, y, z);

    // =====================================
    // RANDOM ROTATION
    // =====================================

    crystal.rotation.set(

      Math.random() * Math.PI,

      Math.random() * Math.PI,

      Math.random() * Math.PI

    );

    // =====================================
    // RANDOM SCALE
    // =====================================

    const scale =
      Math.random() * 0.8 + 0.4;

    crystal.scale.set(scale, scale, scale);

    // =====================================
    // SHADOWS
    // =====================================

    crystal.castShadow = true;
    crystal.receiveShadow = true;

    crystalPile.add(crystal);
  }

  
  crystalPile.name = "edtaCrystals";
  const petriDish = createPetriDish();
  petriDish.position.y = -0.05;
  crystalPile.add(petriDish);
  return crystalPile;
}