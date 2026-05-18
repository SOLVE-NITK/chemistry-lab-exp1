export function setupSceneLayout({ table, flask, burette, beaker, pipette }) {

  const TABLE_Y = 1;

  // 🧪 Base reference (anchor)
  const flaskPos = {
    x: 0,
    y: TABLE_Y - 0.7, // half of flask height to sit on table
    z: 0
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
  

  table.add(pipette)
}