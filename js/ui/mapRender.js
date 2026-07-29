/* ============================================================
   mapRender.js
   探索マップ画面の描画
   ============================================================ */

import { NODE_TYPE_LABEL } from '../data/mapNodes.js';

const TYPE_ICON = {
  battle: '⚔',
  treasure: '📦',
  boss: '👑',
};

export function renderMap(container, explorationState, onSelectNode) {
  container.innerHTML = '';

  explorationState.mapData.forEach((node, index) => {
    const status = explorationState.getNodeStatus(index);

    const item = document.createElement('div');
    item.className = `map-node map-node--${status}`;
    item.innerHTML = `
      <div class="panel map-node__panel">
        <span class="map-node__icon">${TYPE_ICON[node.type] ?? '？'}</span>
        <div class="map-node__label">${node.label}</div>
        <span class="map-node__type">${NODE_TYPE_LABEL[node.type] ?? ''}</span>
        <span class="map-node__status">${
          status === 'cleared' ? 'クリア済み' : status === 'current' ? '挑戦できる' : '未開放'
        }</span>
      </div>
    `;

    if (status === 'current') {
      item.addEventListener('click', () => onSelectNode(node, index));
    }

    container.appendChild(item);

    if (index < explorationState.mapData.length - 1) {
      const connector = document.createElement('div');
      connector.className = `map-connector map-connector--${status === 'cleared' ? 'cleared' : 'open'}`;
      container.appendChild(connector);
    }
  });
}
