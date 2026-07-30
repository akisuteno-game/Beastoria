/* ============================================================
   screens/homeScreen.js
   スターター選択画面
   ============================================================ */

import { STARTERS, createMonsterInstance } from '../data/monsters.js';
import { state, showScreen, persist } from '../state.js';
import { renderStarterGrid } from '../ui/render.js';
import { refreshPartyScreen } from './partyScreen.js';

export function setup() {
  const grid = document.querySelector('#starter-grid');
  const confirmBtn = document.querySelector('#confirm-starter-btn');

  renderStarterGrid(grid, STARTERS, (monster) => {
    state.selectedStarter = monster;
    confirmBtn.disabled = false;
    confirmBtn.textContent = `${monster.name} に決定`;
  });

  confirmBtn.addEventListener('click', () => {
    if (!state.selectedStarter) return;
    const instance = createMonsterInstance(state.selectedStarter);
    state.roster.addMonster(instance);
    state.party.addMember(instance, 'front');
    refreshPartyScreen();
    showScreen('party');
    persist();
  });
}
