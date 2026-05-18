let step = 0;
let volume = 0;
const endpoint = 15;

export function updateExperiment(burette, flask, createDrop) {
  if (step === 4) {
    if (Math.random() < 0.25) createDrop(window.scene);

    volume += 0.02;

    // Update burette liquid
    const liquid = burette.userData.liquid;
    liquid.scale.y -= 0.0005;

    // Color change
    let progress = volume / endpoint;

    flask.userData.liquid.material.color.lerpColors(
      new THREE.Color("purple"),
      new THREE.Color("blue"),
      progress
    );

    if (volume >= endpoint) {
      alert("End Point Reached");
      step = 5;
    }
  }
}

export function setStep(value) {
  step = value;
}