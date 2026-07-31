/* ============================================================
   screens/mapScreen.js
   探索マップ画面(現在選択中のマップを表示する)
   ============================================================ */

import { state, showScreen, persist, getCurrentExploration } from '../state.js';
import { MAPS } from '../data/maps/index.js';
import { renderMap } from '../ui/mapRender.js';
import { startBattle } from './battleScreen.js';

export function refreshMapScreen() {
  const mapData = MAPS[state.currentMapId];
  document.querySelector('#map-title').textContent = `探索: ${mapData.name}`;

  renderMap(document.querySelector('#map-path'), getCurrentExploration(), (node) => {
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
  getCurrentExploration().clearNode(node.id);
  refreshMapScreen();
  persist();
}

export function setup() {
  document.querySelector('#map-select-btn').addEventListener('click', () => {
    showScreen('map-select');
  });
}
