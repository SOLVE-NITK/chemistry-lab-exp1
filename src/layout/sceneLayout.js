export function setupSceneLayout({ table, flask, burette, beaker, pipette, balance,weighingBottle, funnel, washbottle, edtaCrystals }) {

  const TABLE_Y = 1;

  // 🧪 Base reference (anchor)
  const flaskPos = {
    x: 0,
    y: TABLE_Y - 0.7, // half of flask height to sit on table
    z: -1
  };

  // ✅ Place flask first (reference object)
  table.add(flask);
  flask.position.set(flaskPos.x, flaskPos.y, flaskPos.z);

  // ✅ Place burette relative to flask
  table.add(burette);
  burette.position.set(
    flaskPos.x,
    TABLE_Y - 0.8, // slightly lower than flask top
    flaskPos.z
  );


  // Place beaker on the other side of the table
  const beakerPos = {
    x: 2,
    y: TABLE_Y - 0.9,
    z: 0
  };
  table.add(beaker);
  beaker.position.set(beakerPos.x, beakerPos.y, beakerPos.z);
  
  pipette.position.set(-2, 3.2, -1.5);
  pipette.rotation.z = Math.PI / 2;
  pipette.rotation.y = Math.PI / 2;
  table.add(pipette);
  
  balance.position.set(0, 0.2, 1);
  balance.scale.set(0.5, 0.5, 0.5);
  
  table.add(balance);
  
  weighingBottle.position.set(2.5, TABLE_Y - 1.2, 1.5);
  weighingBottle.scale.set(0.5, 0.5, 0.5);
  table.add(weighingBottle);

  funnel.position.set(-3,1.25,-0.8);
  funnel.rotation.x = 180 * Math.PI / 180;
  funnel.scale.y=0.5;
  table.add(funnel);

  washbottle.position.set(3,0.3,0);
  washbottle.scale.set(0.5, 0.5, 0.5);
  table.add(washbottle);

  edtaCrystals.position.set(-3, 0.25, 1);
  table.add(edtaCrystals);

  petriDish.position.set(-3, 0.3, 1);
  table.add(petriDish);
}