/* ============================================================
   screens/partyAddScreen.js
   パーティへの追加(空き枠から所持モンスターを選ぶ)画面
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { renderPartyAddList } from '../ui/partyAddRender.js';
import { refreshPartyScreen } from './partyScreen.js';

export function refreshPartyAddScreen() {
  const inPartyIds = new Set(state.party.members.map((m) => m.monster.instanceId));
  const available = state.roster.list.filter((m) => !inPartyIds.has(m.instanceId));

  renderPartyAddList(document.querySelector('#party-add-grid'), available, (instanceId) => {
    const monster = state.roster.findById(instanceId);
    if (monster && !state.party.isFull()) {
      state.party.addMember(monster, 'back');
    }
    refreshPartyScreen();
    showScreen('party');
    persist();
  });
}

export function setup() {
  document.querySelector('#party-add-back-btn').addEventListener('click', () => {
    refreshPartyScreen();
    showScreen('party');
  });
}
