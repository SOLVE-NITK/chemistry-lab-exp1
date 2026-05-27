import { initScene } from './initScene.js';
import { createBurette } from './objects/Burette.js';
import { createFlask } from './objects/Flask.js';
import { createTable } from './objects/Table.js';
import { createBeaker } from './objects/Beaker.js';
import { createPipette } from './objects/Pipette.js';
import { createWeighingBottle } from './objects/WeighingBottle.js';
import { createElectronicBalance } from './objects/balance.js';
import { createFunnel } from './objects/Funnel.js';
import { createWashBottle } from './objects/Washbottle.js';
import { createEDTACrystals } from './objects/EDTAcrystals.js';
import { createPetriDish } from './objects/PetriDish.js';
import { shuffleArray } from './utils/shuffleArray.js';
import { popUpResult } from './utils/popUpResult.js';
import { updateDrops, createDrop } from './animations/drops.js';
import { updateExperiment } from './logic/experiment.js';
import { setupUI } from './ui/controls.js';
import { setupSceneLayout } from './layout/sceneLayout.js';
import { setupSelection } from './interactions/select.js';
import { setupRaycaster } from './interactions/raycast.js';
import { createApparatusList, setUpFlask, setUpBurette, setUpBeaker, setUpPipette } from './logic/apparatus.js';
import { disappearNotification } from './utils/popUpInfo.js';
const { scene, camera, renderer, controls } = initScene();

const burette = createBurette(scene);
const flask = createFlask(scene);
const beaker = createBeaker(scene);
const table = createTable(scene);
const pipette = createPipette(scene);
const balance = createElectronicBalance();
const weighingBottle = createWeighingBottle();
const funnel = createFunnel();
const washbottle = createWashBottle();
const edtaCrystals = createEDTACrystals();
// const petriDish = createPetriDish();
const apparatusList = createApparatusList({
  flask,
  burette,
  beaker,
  pipette,
  balance,
  edtaCrystals,
  funnel,
  // petriDish,
  washbottle,
  weighingBottle
});

// Popup procedure elements
const infoBtn = document.querySelector("#infoBtn");
const modal = document.getElementById("procedureModal");
const closeModal = document.getElementById("closeModal");

// screen info and start button
const startBtn = document.getElementById("start-btn");
const screenInfo = document.querySelector(".screen-info");
const controlsPanel = document.getElementById("controls");
startBtn.addEventListener("click", () => {
  screenInfo.classList.add("hidden");
  controlsPanel.classList.remove("hidden");
  setupQuiz();
});


let quizOptionsContainer = document.querySelector(".quiz-options");
const shuffledApparatus = shuffleArray(apparatusList);
shuffledApparatus.forEach(item => {
  const option = document.createElement("input");
  option.type = "radio";
  option.name = "apparatus";
  option.value = item.apparatus.name;
  option.id = `option-${item.apparatus.name}`;
  const label = document.createElement("label");
  label.htmlFor = option.id;
  label.textContent = item.apparatus.name.charAt(0).toUpperCase() + item.apparatus.name.slice(1);
  quizOptionsContainer.appendChild(option);
  quizOptionsContainer.appendChild(label);
});

let quizIndex = 0;
let attempts = 0;
let score = 0;
let totalQuestions = apparatusList.length;
const quizBtn = document.querySelector(".quiz-btn");
quizBtn.addEventListener("click", () => {
  evaluateQuiz();
});
const resultView = document.querySelector(".result-bar");

// selectable objects
setupSelection(camera, renderer, [flask, burette, beaker, pipette,balance,weighingBottle, funnel, washbottle]);

// setupUI();
// setupSceneLayout({ table, flask, burette, beaker, pipette });



// Apparatus Identification Quiz

function setupQuiz(quizIndex = 0) {
  const current = apparatusList[quizIndex];
  current.function(scene,current.apparatus);
}


function evaluateQuiz(){
  const correct = apparatusList[quizIndex].apparatus.name === document.querySelector('input[name="apparatus"]:checked').value;
  console.log("Selected:", document.querySelector('input[name="apparatus"]:checked').value, "Correct:", apparatusList[quizIndex].apparatus.name);
  if(correct){
    popUpResult("Correct! Moving to next question.", true);
    document.querySelector('input[name="apparatus"]:checked').checked = false; // reset selection
    document.getElementById("score").textContent = `Score: ${++score} / ${totalQuestions}`;
    quizIndex++; 
    attempts = 0;
    scene.remove(scene.getObjectByName(apparatusList[quizIndex-1].apparatus.name));
    if(quizIndex < totalQuestions){
      setupQuiz(quizIndex); 
    } else if(quizIndex === totalQuestions){ 
      controlsPanel.classList.add("hidden");
      resultView.textContent = `Quiz Completed! Final Score: ${score} / ${totalQuestions}`;
      resultView.classList.add("hidden");
      screenInfo.classList.remove("hidden");
      document.querySelector(".procedure").classList.remove("hidden");
      screenInfo.innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is ${score} out of ${totalQuestions}.</p><p>Look into the procedure for more details.</p><button id="parta-btn" class="parta-btn btn">Part A</button>`;
      setupSceneLayout({ table, flask, burette, beaker, pipette, balance,weighingBottle, funnel, washbottle, edtaCrystals });
      disappearNotification(screenInfo, 2500);
    }
  }
  else{
    popUpResult("Incorrect. Try again.", false);
    attempts++;
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
    if(attempts >= 2){
      popUpResult(`The correct answer is: ${apparatusList[quizIndex].apparatus.toUpperCase()}. Moving to next question.`, false);
      document.querySelector('input[name="apparatus"]:checked').checked = false; // reset selection
      document.getElementById("score").textContent = `Score: ${score} / ${totalQuestions}`;
      quizIndex++; 
      attempts = 0;
      scene.remove(scene.getObjectByName(apparatusList[quizIndex-1].apparatus));
      setupQuiz(quizIndex); 
    }
  }
}


// Procedure pop up
// OPEN
infoBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});


// CLOSE
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// CLICK OUTSIDE TO CLOSE
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});


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