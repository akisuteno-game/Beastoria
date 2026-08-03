/* ============================================================
   screens/loadScreen.js
   ロード画面(タイトルの「つづきから」から遷移)
   ============================================================ */

import { state, showScreen, applySaveData } from '../state.js';
import { SAVE_SLOTS, loadSaveData } from '../systems/saveLoad.js';
import { renderSaveSlots } from '../ui/saveSlotRender.js';
import { refreshPartyScreen } from './partyScreen.js';

export function refreshLoadScreen() {
  renderSaveSlots(document.querySelector('#load-slot-list'), SAVE_SLOTS, 'load', (slot) => {
    const data = loadSaveData(slot);
    if (!data) return;
    applySaveData(data);
    refreshPartyScreen();
    showScreen('party');
  });
}

export function setup() {
  document.querySelector('#load-back-btn').addEventListener('click', () => {
    showScreen('title');
  });
}
