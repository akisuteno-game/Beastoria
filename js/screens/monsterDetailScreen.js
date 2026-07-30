/* ============================================================
   screens/monsterDetailScreen.js
   モンスター詳細画面(進化・異姿化)

   ※ refreshPartyScreen / refreshRosterScreenの相互import(戻る先の
     再描画のため)は循環参照になるが、どちらもイベントハンドラの
     中でしか呼ばれないため問題ない。
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { renderMonsterDetail } from '../ui/monsterDetailRender.js';
import { evolveMonster } from '../systems/evolution.js';
import { transformMonster } from '../systems/transformation.js';
import { refreshPartyScreen } from './partyScreen.js';
import { refreshRosterScreen } from './rosterScreen.js';

export function refreshDetailScreen() {
  const instance = state.roster.findById(state.detailInstanceId);
  if (!instance) return;
  renderMonsterDetail(document.querySelector('#monster-detail-body'), instance, state.inventory, {
    onEvolve: (instanceId) => {
      const target = state.roster.findById(instanceId);
      if (target) evolveMonster(target, state.inventory);
      refreshDetailScreen();
      persist();
    },
    onTransform: (instanceId) => {
      const target = state.roster.findById(instanceId);
      if (target) transformMonster(target, state.inventory);
      refreshDetailScreen();
      persist();
    },
  });
}

export function setup() {
  document.querySelector('#detail-back-btn').addEventListener('click', () => {
    if (state.detailReturnScreen === 'roster') {
      refreshRosterScreen();
    } else {
      refreshPartyScreen();
    }
    showScreen(state.detailReturnScreen);
  });
}
