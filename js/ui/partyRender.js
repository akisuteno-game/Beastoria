/* ============================================================
   partyRender.js
   パーティ編成画面の描画(前衛/後衛レーン)
   ============================================================ */

import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { renderAttrBadgesHtml, primaryAttrColor } from '../utils/attrBadges.js';
import { MAX_PARTY_SIZE } from '../systems/party.js';

function buildMemberCard(monster, row, onToggleRow, onRemove, onDetail) {
  const card = document.createElement('div');
  card.className = 'party-slot party-slot--filled';

  card.innerHTML = `
    <div class="panel">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name">${monster.name}</div>
      ${renderAttrBadgesHtml(monster.attributes)}
      <div class="monster-card__type">Lv.${monster.level}</div>
    </div>
    <div class="party-slot__controls">
      <button class="btn btn--ghost btn--sm" data-action="detail">詳細</button>
      <button class="btn btn--ghost btn--sm" data-action="toggle">${row === 'front' ? '前衛→後衛' : '後衛→前衛'}</button>
      <button class="btn btn--ghost btn--sm" data-action="remove">外す</button>
    </div>
  `;

  renderPlaceholderSprite(card.querySelector('canvas'), primaryAttrColor(monster.attributes));

  card.querySelector('[data-action="detail"]').addEventListener('click', () => onDetail(monster.instanceId));
  card.querySelector('[data-action="toggle"]').addEventListener('click', () => onToggleRow(monster.instanceId));
  card.querySelector('[data-action="remove"]').addEventListener('click', () => onRemove(monster.instanceId));

  return card;
}

function buildEmptySlot(onAdd) {
  const el = document.createElement('div');
  el.className = 'party-slot party-slot--empty panel';
  el.innerHTML = `<span class="party-slot__placeholder">空き枠<br>タップして追加</span>`;
  el.addEventListener('click', () => onAdd());
  return el;
}

export function renderPartyLanes(frontEl, backEl, party, handlers) {
  frontEl.innerHTML = '';
  backEl.innerHTML = '';

  party.frontRow.forEach(({ monster }) => {
    frontEl.appendChild(
      buildMemberCard(monster, 'front', handlers.onToggleRow, handlers.onRemove, handlers.onDetail)
    );
  });

  party.backRow.forEach(({ monster }) => {
    backEl.appendChild(
      buildMemberCard(monster, 'back', handlers.onToggleRow, handlers.onRemove, handlers.onDetail)
    );
  });

  // 残り枠を「空き枠」として表示(4体になるまで)。タップで追加画面を開く。
  const emptyCount = MAX_PARTY_SIZE - party.members.length;
  for (let i = 0; i < emptyCount; i += 1) {
    backEl.appendChild(buildEmptySlot(handlers.onAdd));
  }
}
