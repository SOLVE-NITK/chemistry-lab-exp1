import { initScene } from './initScene.js';
import { createBurette } from './objects/Burette.js';
import { createFlask } from './objects/Flask.js';
import { createTable } from './objects/Table.js';
import { createBeaker } from './objects/Beaker.js';
import { createPipette } from './objects/Pipette.js';
import { updateDrops, createDrop } from './animations/drops.js';
import { updateExperiment } from './logic/experiment.js';
import { setupUI } from './ui/controls.js';
import { setupSceneLayout } from './layout/sceneLayout.js';
import { setupSelection } from './interactions/select.js';
import { setupRaycaster } from './interactions/raycast.js';
import { getApparatusList, setUpFlask, setUpBurette, setUpBeaker, setUpPipette } from './logic/apparatus.js';
const { scene, camera, renderer, controls } = initScene();

const burette = createBurette(scene);
const flask = createFlask(scene);
const beaker = createBeaker(scene);
const table = createTable(scene);
const pipette = createPipette(scene);
const apparatus = getApparatusList();


let quizIndex = 0;
let attempts = 0;
let score = 0;
let totalQuestions = apparatus.length;
const quizBtn = document.querySelector(".quiz-btn");
quizBtn.addEventListener("click", () => {
  evaluateQuiz();
});
const resultView = document.querySelector(".result-bar");

// selectable objects
setupSelection(camera, renderer, [flask, burette, beaker, pipette]);

// setupUI();
// setupSceneLayout({ table, flask, burette, beaker, pipette });



// Apparatus Identification Quiz
setupQuiz();
function setupQuiz(quizIndex = 0) {
  apparatus[quizIndex].function(scene, apparatus[quizIndex].name === "flask" ? flask : apparatus[quizIndex].name === "burette" ? burette : apparatus[quizIndex].name === "beaker" ? beaker : pipette);

}


function evaluateQuiz(){
  const correct = apparatus[quizIndex].name === document.querySelector('input[name="apparatus"]:checked').value.toLowerCase();
  if(correct){
    resultView.textContent = "Correct! Move to next question.";
    resultView.classList.remove("wrong-answer");
    resultView.classList.remove("attempt-alert")
    resultView.classList.add("correct-answer");
    document.querySelector('input[name="apparatus"]:checked').checked = false; // reset selection
    document.getElementById("score").textContent = `Score: ${++score} / ${totalQuestions}`;
    quizIndex++; 
    attempts = 0;
    scene.remove(scene.getObjectByName(apparatus[quizIndex-1].name));
    setupQuiz(quizIndex); 
  }
  else{
    resultView.textContent = "Incorrect. Try again.";
    resultView.classList.remove("correct-answer")
    resultView.classList.add("wrong-answer")
    attempts++;
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
    if(attempts >= 2){
      resultView.textContent = `The correct answer is: ${apparatus[quizIndex].name.toUpperCase()}. Moving to next question.`;
      resultView.classList.remove("wrong-answer")
      resultView.classList.add("attempt-alert")
      document.querySelector('input[name="apparatus"]:checked').checked = false; // reset selection
      document.getElementById("score").textContent = `Score: ${score} / ${totalQuestions}`;
      quizIndex++; 
      attempts = 0;
      scene.remove(scene.getObjectByName(apparatus[quizIndex-1].name));
      setupQuiz(quizIndex); 
    }
  }
}

// 🔥 Add this
const interaction = setupRaycaster(scene, camera, renderer);

function animate() {
  requestAnimationFrame(animate);

  updateDrops(scene);
  updateExperiment(burette, flask, table, createDrop);

  controls.update();
  renderer.render(scene, camera);
}




animate();