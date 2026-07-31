/* ============================================================
   mapSelectRender.js
   マップ選択画面の描画
   ============================================================ */

import { MAPS, MAP_ORDER } from '../data/maps/index.js';

function countProgress(mapData, explorationState) {
  const total = Object.keys(mapData.nodes).length;
  const cleared = explorationState.cleared.size;
  return { total, cleared };
}

export function renderMapSelect(container, explorations, isMapUnlocked, onSelectMap) {
  container.innerHTML = '';

  MAP_ORDER.forEach((mapId) => {
    const mapData = MAPS[mapId];
    const unlocked = isMapUnlocked(mapId);
    const { total, cleared } = countProgress(mapData, explorations[mapId]);
    const complete = cleared >= total;

    const card = document.createElement('div');
    card.className = `panel map-select-item ${unlocked ? '' : 'map-select-item--locked'}`;
    card.innerHTML = `
      <div class="map-select-item__name">${mapData.name}</div>
      <div class="map-select-item__status">${
        !unlocked ? '未開放(前のマップのボスを倒すと開放)' : complete ? '踏破済み(再挑戦できます)' : `進行状況: ${cleared} / ${total}`
      }</div>
    `;
    if (unlocked) {
      card.addEventListener('click', () => onSelectMap(mapId));
    }
    container.appendChild(card);
  });
}
