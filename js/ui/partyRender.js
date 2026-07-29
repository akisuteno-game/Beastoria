/* ============================================================
   partyRender.js
   パーティ編成画面の描画(前衛/後衛レーン)
   ============================================================ */

import { ATTRIBUTES } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { MAX_PARTY_SIZE } from '../systems/party.js';

function buildMemberCard(monster, row, onToggleRow, onRemove) {
  const attr = ATTRIBUTES[monster.attribute];
  const card = document.createElement('div');
  card.className = 'party-slot party-slot--filled';

  card.innerHTML = `
    <div class="panel">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name">${monster.name}</div>
      <span class="attr-badge ${attr.badgeClass}">${attr.label}属性</span>
    </div>
    <div class="party-slot__controls">
      <button class="btn btn--ghost btn--sm" data-action="toggle">${row === 'front' ? '前衛→後衛' : '後衛→前衛'}</button>
      <button class="btn btn--ghost btn--sm" data-action="remove">外す</button>
    </div>
  `;

  renderPlaceholderSprite(card.querySelector('canvas'), attr.color);

  card.querySelector('[data-action="toggle"]').addEventListener('click', () => onToggleRow(monster.instanceId));
  card.querySelector('[data-action="remove"]').addEventListener('click', () => onRemove(monster.instanceId));

  return card;
}

function buildEmptySlot() {
  const el = document.createElement('div');
  el.className = 'party-slot party-slot--empty panel';
  el.innerHTML = `<span class="party-slot__placeholder">空き枠</span>`;
  return el;
}

export function renderPartyLanes(frontEl, backEl, party, handlers) {
  frontEl.innerHTML = '';
  backEl.innerHTML = '';

  party.frontRow.forEach(({ monster }) => {
    frontEl.appendChild(
      buildMemberCard(monster, 'front', handlers.onToggleRow, handlers.onRemove)
    );
  });

  party.backRow.forEach(({ monster }) => {
    backEl.appendChild(
      buildMemberCard(monster, 'back', handlers.onToggleRow, handlers.onRemove)
    );
  });

  // 残り枠を「空き枠」として表示(4体になるまで)
  const emptyCount = MAX_PARTY_SIZE - party.members.length;
  for (let i = 0; i < emptyCount; i += 1) {
    backEl.appendChild(buildEmptySlot());
  }
}
