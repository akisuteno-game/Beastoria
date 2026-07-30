/* ============================================================
   screens/mapScreen.js
   探索マップ画面
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { renderMap } from '../ui/mapRender.js';
import { startBattle } from './battleScreen.js';
import { refreshPartyScreen } from './partyScreen.js';

export function refreshMapScreen() {
  renderMap(document.querySelector('#map-path'), state.exploration, (node) => {
    if (node.type === 'treasure') {
      claimTreasure(node);
    } else {
      startBattle(node);
    }
  });
}

function claimTreasure(node) {
  if (node.reward.stones) {
    state.inventory.addStones(node.reward.stones.attribute, node.reward.stones.amount);
  }
  if (node.reward.item) {
    state.inventory.addItem(node.reward.item.itemId, node.reward.item.amount);
  }
  if (node.reward.items) {
    node.reward.items.forEach((it) => state.inventory.addItem(it.itemId, it.amount));
  }
  if (node.reward.gold) {
    state.inventory.addGold(node.reward.gold);
  }
  state.exploration.clearNode(node.id);
  refreshMapScreen();
  persist();
}

export function setup() {
  document.querySelector('#map-party-btn').addEventListener('click', () => {
    refreshPartyScreen();
    showScreen('party');
  });
}
