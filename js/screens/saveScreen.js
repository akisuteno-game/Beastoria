/* ============================================================
   screens/saveScreen.js
   セーブ画面(手動セーブ、slot1〜3のみ)
   ============================================================ */

import { state, showScreen, persistToSlot } from '../state.js';
import { renderSaveSlots } from '../ui/saveSlotRender.js';

const MANUAL_SLOTS = ['slot1', 'slot2', 'slot3'];

export function refreshSaveScreen() {
  renderSaveSlots(document.querySelector('#save-slot-list'), MANUAL_SLOTS, 'save', (slot) => {
    persistToSlot(slot);
    refreshSaveScreen();
  });
}

export function setup() {
  document.querySelector('#save-open-btn').addEventListener('click', () => {
    refreshSaveScreen();
    showScreen('save');
  });

  document.querySelector('#save-back-btn').addEventListener('click', () => {
    showScreen('party');
  });
}
