/* ============================================================
   screens/partyScreen.js
   パーティ編成画面
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { renderPartyLanes } from '../ui/partyRender.js';
import { refreshDetailScreen } from './monsterDetailScreen.js';
import { refreshPartyAddScreen } from './partyAddScreen.js';
import { refreshMapScreen } from './mapScreen.js';

export function refreshPartyScreen() {
  renderPartyLanes(
    document.querySelector('#party-front'),
    document.querySelector('#party-back'),
    state.party,
    {
      onToggleRow: (instanceId) => {
        state.party.toggleRow(instanceId);
        refreshPartyScreen();
        persist();
      },
      onRemove: (instanceId) => {
        state.party.removeMember(instanceId);
        refreshPartyScreen();
        persist();
      },
      onDetail: (instanceId) => {
        state.detailInstanceId = instanceId;
        state.detailReturnScreen = 'party';
        refreshDetailScreen();
        showScreen('monster-detail');
      },
      onAdd: () => {
        refreshPartyAddScreen();
        showScreen('party-add');
      },
    }
  );
}

export function setup() {
  document.querySelector('#party-done-btn').addEventListener('click', () => {
    if (state.party.members.length === 0) return;
    refreshMapScreen();
    showScreen('map');
  });
}
