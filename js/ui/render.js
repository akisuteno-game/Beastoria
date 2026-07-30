/* ============================================================
   render.js
   スターター選択画面の描画
   ============================================================ */

import { ATTRIBUTES, rarityToStars, ROLE_LABEL } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';

export function renderStarterGrid(container, monsters, onSelect) {
  container.innerHTML = '';

  monsters.forEach((monster) => {
    const attr = ATTRIBUTES[monster.attribute];

    const card = document.createElement('div');
    card.className = 'monster-card';
    card.dataset.id = monster.id;

    card.innerHTML = `
      <div class="panel">
        <canvas class="monster-card__sprite" width="64" height="64"></canvas>
        <div class="monster-card__name">${monster.name}</div>
        <span class="attr-badge ${attr.badgeClass}">${attr.label}属性</span>
        <div class="monster-card__type">${ROLE_LABEL[monster.role]}</div>
        <div class="rarity">${rarityToStars(monster.rarity)}</div>
      </div>
    `;

    const canvas = card.querySelector('canvas');
    renderPlaceholderSprite(canvas, attr.color);

    card.addEventListener('click', () => {
      container.querySelectorAll('.monster-card').forEach((c) =>
        c.classList.remove('is-selected')
      );
      card.classList.add('is-selected');
      onSelect(monster);
    });

    container.appendChild(card);
  });
}
