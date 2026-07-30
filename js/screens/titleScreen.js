/* ============================================================
   screens/titleScreen.js
   タイトル画面(はじめる・つづきから)
   ============================================================ */

import { state, showScreen, applySaveData } from '../state.js';
import { hasSaveData, loadSaveData } from '../systems/saveLoad.js';
import { refreshPartyScreen } from './partyScreen.js';

export function setup() {
  const continueBtn = document.querySelector('#continue-btn');
  if (hasSaveData()) {
    continueBtn.style.display = '';
  }

  document.querySelector('#start-btn').addEventListener('click', () => {
    showScreen('home');
  });

  continueBtn.addEventListener('click', () => {
    const data = loadSaveData();
    if (!data) return;
    applySaveData(data);
    refreshPartyScreen();
    showScreen('party');
  });
}
