/* ============================================================
   partyAddRender.js
   パーティへの追加(空き枠から所持モンスターを選ぶ)画面の描画
   ============================================================ */

import { rarityToStars } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { renderAttrBadgesHtml, primaryAttrColor } from '../utils/attrBadges.js';

export function renderPartyAddList(container, availableMonsters, onSelect) {
  container.innerHTML = '';

  if (availableMonsters.length === 0) {
    container.innerHTML = `<p class="detail-note">追加できるモンスターがいません。探索でモンスターを増やそう。</p>`;
    return;
  }

  availableMonsters.forEach((instance) => {
    const card = document.createElement('div');
    card.className = 'monster-card';
    card.innerHTML = `
      <div class="panel">
        <canvas class="monster-card__sprite" width="64" height="64"></canvas>
        <div class="monster-card__name">${instance.name}</div>
        ${renderAttrBadgesHtml(instance.attributes)}
        <div class="monster-card__type">Lv.${instance.level}</div>
        <div class="rarity">${rarityToStars(instance.rarity)}</div>
      </div>
    `;
    renderPlaceholderSprite(card.querySelector('canvas'), primaryAttrColor(instance.attributes));
    card.addEventListener('click', () => onSelect(instance.instanceId));
    container.appendChild(card);
  });
}
