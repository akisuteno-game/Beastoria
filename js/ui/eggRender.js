/* ============================================================
   eggRender.js
   タマゴ孵化画面の描画
   ============================================================ */

import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { renderAttrBadgesHtml, primaryAttrColor } from '../utils/attrBadges.js';

export function renderEggScreen(container, eggType, inventory, lastHatched, onHatch) {
  const owned = inventory.items[eggType.id] ?? 0;

  container.innerHTML = `
    <div class="panel egg-panel">
      <div class="egg-panel__count">${eggType.name}: 所持 ${owned}個</div>
      <button id="hatch-btn" class="btn" ${owned > 0 ? '' : 'disabled'}>孵化させる</button>
    </div>
    <div id="egg-result"></div>
  `;

  container.querySelector('#hatch-btn').addEventListener('click', onHatch);

  if (lastHatched) {
    const resultEl = container.querySelector('#egg-result');
    resultEl.innerHTML = `
      <div class="panel panel--raised egg-result">
        <div class="egg-result__label">生まれた!</div>
        <canvas class="monster-card__sprite" width="64" height="64"></canvas>
        <div class="monster-card__name">${lastHatched.name}</div>
        ${renderAttrBadgesHtml(lastHatched.attributes)}
      </div>
    `;
    renderPlaceholderSprite(resultEl.querySelector('canvas'), primaryAttrColor(lastHatched.attributes));
  }
}
