export function popUpResult(message, isCorrect) {

  const resultView = document.querySelector(".result-bar");
  resultView.textContent = message;
  resultView.classList.remove("correct-answer", "wrong-answer", "attempt-alert");

  if (isCorrect) {
    resultView.classList.add("correct-answer");
  } else {
    resultView.classList.add("wrong-answer");
  }
  setTimeout(() => {
    resultView.textContent = "";
    resultView.classList.remove("correct-answer", "wrong-answer");
  }, 3000); // Clear after 3 seconds

}