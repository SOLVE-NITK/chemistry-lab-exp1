import { setStep } from '../logic/experiment.js';

export function setupUI() {
  window.addSample = () => setStep(1);
  window.addBuffer = () => setStep(2);
  window.addIndicator = () => setStep(3);
  window.startTitration = () => setStep(4);
}