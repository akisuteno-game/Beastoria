/* ============================================================
   partyAddRender.js
   パーティへの追加(空き枠から所持モンスターを選ぶ)画面の描画
   ============================================================ */

import { ATTRIBUTES, rarityToStars } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';

export function renderPartyAddList(container, availableMonsters, onSelect) {
  container.innerHTML = '';

  if (availableMonsters.length === 0) {
    container.innerHTML = `<p class="detail-note">追加できるモンスターがいません。探索でモンスターを増やそう。</p>`;
    return;
  }

  availableMonsters.forEach((instance) => {
    const attr = ATTRIBUTES[instance.attribute];
    const card = document.createElement('div');
    card.className = 'monster-card';
    card.innerHTML = `
      <div class="panel">
        <canvas class="monster-card__sprite" width="64" height="64"></canvas>
        <div class="monster-card__name">${instance.name}</div>
        <span class="attr-badge ${attr.badgeClass}">${attr.label}属性</span>
        <div class="monster-card__type">Lv.${instance.level}</div>
        <div class="rarity">${rarityToStars(instance.rarity)}</div>
      </div>
    `;
    renderPlaceholderSprite(card.querySelector('canvas'), attr.color);
    card.addEventListener('click', () => onSelect(instance.instanceId));
    container.appendChild(card);
  });
}
