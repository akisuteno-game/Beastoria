/* ============================================================
   screens/eggScreen.js
   タマゴ孵化画面
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { BASIC_EGG } from '../data/eggs.js';
import { hatchEgg } from '../systems/eggs.js';
import { renderEggScreen } from '../ui/eggRender.js';

let lastHatched = null;

export function refreshEggScreen() {
  renderEggScreen(document.querySelector('#egg-body'), BASIC_EGG, state.inventory, lastHatched, () => {
    const result = hatchEgg(BASIC_EGG, state.inventory);
    if (result.success) {
      state.roster.addMonster(result.instance);
      lastHatched = result.instance;
      persist();
    }
    refreshEggScreen();
  });
}

export function setup() {
  document.querySelector('#egg-open-btn').addEventListener('click', () => {
    refreshEggScreen();
    showScreen('egg');
  });

  document.querySelector('#egg-back-btn').addEventListener('click', () => {
    showScreen('party');
  });
}
