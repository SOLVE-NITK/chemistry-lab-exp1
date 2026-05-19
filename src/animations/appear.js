export function animateAppear(object) {

  // start invisible
  object.scale.set(0, 0, 0);

  let scale = 0;

  function grow() {

    scale += 0.05;

    object.scale.set(scale, scale, scale);

    if (scale < 1) {
      requestAnimationFrame(grow);
    } else {
      object.scale.set(1,1,1);
    }
  }

  grow();
}