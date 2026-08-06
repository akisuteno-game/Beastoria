/* ============================================================
   screens/titleScreen.js
   タイトル画面(はじめる・つづきから)
   ============================================================ */

import { showScreen } from '../state.js';
import { SAVE_SLOTS, hasSaveData } from '../systems/saveLoad.js';
import { refreshLoadScreen } from './loadScreen.js';

export function setup() {
  const continueBtn = document.querySelector('#continue-btn');
  if (SAVE_SLOTS.some((slot) => hasSaveData(slot))) {
    continueBtn.style.display = '';
  }

  document.querySelector('#start-btn').addEventListener('click', () => {
    showScreen('home');
  });

  continueBtn.addEventListener('click', () => {
    refreshLoadScreen();
    showScreen('load');
  });
}
