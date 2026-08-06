/* ============================================================
   screens/rosterScreen.js
   所持モンスター一覧・簡易図鑑画面
   ============================================================ */

import { STARTERS } from '../data/monsters.js';
import { EGG_MONSTERS } from '../data/eggMonsters.js';
import { state, showScreen } from '../state.js';
import { renderRoster } from '../ui/rosterRender.js';
import { refreshDetailScreen } from './monsterDetailScreen.js';

const ALL_SPECIES = [...STARTERS, ...EGG_MONSTERS];

export function refreshRosterScreen() {
  renderRoster(document.querySelector('#roster-grid'), state.roster, ALL_SPECIES, (instanceId) => {
    state.detailInstanceId = instanceId;
    state.detailReturnScreen = 'roster';
    refreshDetailScreen();
    showScreen('monster-detail');
  });
}

export function setup() {
  document.querySelector('#roster-open-btn').addEventListener('click', () => {
    refreshRosterScreen();
    showScreen('roster');
  });

  document.querySelector('#roster-back-btn').addEventListener('click', () => {
    showScreen('party');
  });
}
