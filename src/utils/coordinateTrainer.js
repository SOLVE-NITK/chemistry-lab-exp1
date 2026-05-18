let selectedObject = null;
let snapEnabled = false;

export function setSelectedObject(obj) {
  selectedObject = obj;
  updateUI();
}

export function updateUI() {
  if (!selectedObject) return;

  document.getElementById("posX").value = selectedObject.position.x.toFixed(2);
  document.getElementById("posY").value = selectedObject.position.y.toFixed(2);
  document.getElementById("posZ").value = selectedObject.position.z.toFixed(2);
}

window.applyPosition = function () {
  if (!selectedObject) return;

  let x = parseFloat(document.getElementById("posX").value);
  let y = parseFloat(document.getElementById("posY").value);
  let z = parseFloat(document.getElementById("posZ").value);

  if (snapEnabled) {
    x = Math.round(x);
    y = Math.round(y);
    z = Math.round(z);
  }

  selectedObject.position.set(x, y, z);
};

window.toggleSnap = function () {
  snapEnabled = !snapEnabled;

  document.querySelector("#coord-panel button:nth-child(2)").innerText =
    "Snap: " + (snapEnabled ? "ON" : "OFF");
};