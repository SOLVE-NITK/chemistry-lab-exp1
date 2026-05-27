
 import { animateAppear } from "../animations/appear.js";
 export function createApparatusList({
  flask,
  burette,
  beaker,
  pipette,
  balance,
  edtaCrystals,
  funnel,
  washbottle,
  weighingBottle
}) {

  return [

    {
      index: 0,
      apparatus: beaker,
      function: setUpBeaker
    },

    {
      index: 1,
      apparatus: burette,
      function: setUpBurette
    },

    {
      index: 2,
      apparatus: flask,
      function: setUpFlask
    },

    {
      index: 3,
      apparatus: pipette,
      function: setUpPipette
    },

    {
      index: 4,
      apparatus: balance,
      function: setUpBalance
    },

    {
      index: 5,
      apparatus: edtaCrystals,
      function: setUpEdtacrystals
    },
    {
      index: 6,
      apparatus: funnel,
      function: setUpFunnel
    },
    {
      index: 7,
      apparatus: washbottle,
      function: setUpWashbottle
    },
    {
      index: 8,
      apparatus: weighingBottle,
      function: setUpWeighingBottle
    }
  ];
}

 export function setUpFlask(scene, flask) {
  flask.position.set(0, -1.7, 0);
  scene.add(flask);
  animateAppear(flask);
 }

 export function setUpBurette(scene, burette) {
  burette.position.set(0, -1.7, 0);
  scene.add(burette);
  animateAppear(burette);
 }

 export function setUpBeaker(scene, beaker) {
  beaker.position.set(0, -1.7, 0);
  scene.add(beaker);
  animateAppear(beaker);
 }

 export function setUpPipette(scene, pipette) {
  pipette.position.set(0, 1.2, -1.2);
  scene.add(pipette);
  animateAppear(pipette);
 }

 export function setUpBalance(scene, balance) {
  balance.position.set(0, -1.7, 0);
  scene.add(balance);
  animateAppear(balance);
 }


export function setUpEdtacrystals(scene, edtaCrystals) {
  edtaCrystals.position.set(0, -1.7, 0);
  scene.add(edtaCrystals);
  animateAppear(edtaCrystals);
}

export function setUpFunnel(scene, funnel) {
  funnel.position.set(0, 0.2, 0.5);
  funnel.rotation.x = 180 * Math.PI / 180;
  funnel.scale.y=0.5;
  scene.add(funnel);
  animateAppear(funnel);
}


export function setUpWashbottle(scene, washbottle) {
  washbottle.position.set(0, -1.7, 0);
  washbottle.scale.set(0.5,0.5,0.5);
  scene.add(washbottle);
  animateAppear(washbottle);
}

export function setUpWeighingBottle(scene, weighingBottle) {
  weighingBottle.position.set(0, -2.4, 0);
  weighingBottle.scale.set(0.5,0.5,0.5);
  scene.add(weighingBottle);
  animateAppear(weighingBottle);
}