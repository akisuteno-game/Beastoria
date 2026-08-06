/* ============================================================
   screens/mapSelectScreen.js
   マップ選択画面
   ============================================================ */

import { state, showScreen, isMapUnlocked, resetMapProgress } from '../state.js';
import { renderMapSelect } from '../ui/mapSelectRender.js';
import { refreshMapScreen } from './mapScreen.js';
import { refreshPartyScreen } from './partyScreen.js';

export function refreshMapSelectScreen() {
  renderMapSelect(document.querySelector('#map-select-list'), state.explorations, isMapUnlocked, (mapId) => {
    // クリア済みのマップを選び直した場合は、最初からやり直す
    if (state.explorations[mapId].isComplete()) {
      resetMapProgress(mapId);
    }
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
