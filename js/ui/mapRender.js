/* ============================================================
   mapRender.js
   探索マップ画面の描画(分岐対応)

   スタートノードからの深さ(段数)ごとに横並びの「段」を作り、
   縦に積み上げて表示する。同じ段に複数ノードがあれば、それが
   分岐(プレイヤーがどちらか一方を選ぶ)であることを示す。
   ============================================================ */

import { NODE_TYPE_LABEL } from '../data/mapNodes.js';

const TYPE_ICON = {
  battle: '⚔',
  treasure: '📦',
  boss: '👑',
};

// スタートノードからBFSで各ノードの深さ(段)を求める
function computeTiers(mapData) {
  const depth = { [mapData.startId]: 0 };
  const queue = [mapData.startId];

  while (queue.length > 0) {
    const id = queue.shift();
    const node = mapData.nodes[id];
    node.next.forEach((nextId) => {
      if (!(nextId in depth)) {
        depth[nextId] = depth[id] + 1;
        queue.push(nextId);
      }
    });
  }

  const tiers = [];
  Object.entries(depth).forEach(([id, d]) => {
    if (!tiers[d]) tiers[d] = [];
    tiers[d].push(id);
  });
  return tiers;
}

function buildNodePanel(node, status, onSelectNode) {
  const el = document.createElement('div');
  el.className = `map-node map-node--${status}`;
  el.innerHTML = `
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
    el.addEventListener('click', () => onSelectNode(node));
  }
  return el;
}

export function renderMap(container, explorationState, onSelectNode) {
  container.innerHTML = '';
  const tiers = computeTiers(explorationState.mapData);

  tiers.forEach((tierIds, tierIndex) => {
    const row = document.createElement('div');
    row.className = 'map-tier';
    if (tierIds.length > 1) row.classList.add('map-tier--branch');

    tierIds.forEach((id) => {
      const node = explorationState.getNode(id);
      const status = explorationState.getNodeStatus(id);
      row.appendChild(buildNodePanel(node, status, onSelectNode));
    });

    container.appendChild(row);

    if (tierIndex < tiers.length - 1) {
      const connector = document.createElement('div');
      const allCleared = tierIds.every((id) => explorationState.getNodeStatus(id) === 'cleared');
      connector.className = `map-connector map-connector--${allCleared ? 'cleared' : 'open'}`;
      container.appendChild(connector);
    }
  });
}
