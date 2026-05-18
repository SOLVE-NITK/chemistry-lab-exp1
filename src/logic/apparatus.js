
 const apparatusList = [
  {
    index: 0,
    name: "beaker",
    function: setUpBeaker
  },
  {
    index: 1,
    name: "burette",
    function: setUpBurette
  },
  {
    index: 2,
    name: "flask",
    function: setUpFlask
  },
  {
    index: 3,
    name: "pipette",
    function: setUpPipette
  },
 ]



 export function getApparatusList() {
  return apparatusList;
 }

 export function setUpFlask(scene, flask) {
  flask.position.set(0, -1.7, 0);
  scene.add(flask);
 }

 export function setUpBurette(scene, burette) {
  burette.position.set(0, -1.7, 0);
  scene.add(burette);
 }

 export function setUpBeaker(scene, beaker) {
  beaker.position.set(0, -1.7, 0);
  scene.add(beaker);
 }

 export function setUpPipette(scene, pipette) {
  pipette.position.set(0, 1.2, -1.2);
  scene.add(pipette);
 }