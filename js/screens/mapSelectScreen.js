/* ============================================================
   screens/mapSelectScreen.js
   マップ選択画面
   ============================================================ */

import { state, showScreen, isMapUnlocked } from '../state.js';
import { renderMapSelect } from '../ui/mapSelectRender.js';
import { refreshMapScreen } from './mapScreen.js';
import { refreshPartyScreen } from './partyScreen.js';

export function refreshMapSelectScreen() {
  renderMapSelect(document.querySelector('#map-select-list'), state.explorations, isMapUnlocked, (mapId) => {
    state.currentMapId = mapId;
    refreshMapScreen();
    showScreen('map');
  });
}

export function setup() {
  document.querySelector('#map-select-party-btn').addEventListener('click', () => {
    refreshPartyScreen();
    showScreen('party');
  });
}
