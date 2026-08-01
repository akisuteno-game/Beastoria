/* ============================================================
   battleRender.js
   バトル画面の描画(味方は左・敵は右のレイアウト)
   ============================================================ */

import { renderAttrBadgesHtml } from '../utils/attrBadges.js';

function buildUnitCard(unit, onUseSpecial) {
  const card = document.createElement('div');
  card.className = `unit-card panel ${unit.alive ? '' : 'unit-card--down'}`;
  card.dataset.unitId = unit.unitId;

  const hpPct = Math.round((unit.hp / unit.maxHp) * 100);
  const gaugePct = unit.side === 'ally' ? Math.round((unit.gauge / unit.gaugeMax) * 100) : null;
  const canUseSpecial = unit.side === 'ally' && unit.alive && unit.gauge >= unit.gaugeMax;

  card.innerHTML = `
    <div class="unit-card__head">
      <span class="unit-card__name">${unit.name}</span>
      ${renderAttrBadgesHtml(unit.attributes)}
    </div>
    <div class="bar bar--hp"><div class="bar__fill" style="width:${hpPct}%"></div></div>
    <span class="bar__label">HP ${unit.hp}/${unit.maxHp}</span>
    ${gaugePct !== null ? `
      <div class="bar bar--gauge"><div class="bar__fill" style="width:${gaugePct}%"></div></div>
      <span class="bar__label">獣魂技 ${gaugePct}%</span>
    ` : ''}
    ${canUseSpecial ? `<button class="btn btn--sm btn--special" data-action="special">獣魂技!</button>` : ''}
    ${!unit.alive ? `<span class="unit-card__ko">戦闘不能</span>` : ''}
  `;

  if (canUseSpecial) {
    card.querySelector('[data-action="special"]').addEventListener('click', () => onUseSpecial(unit.unitId));
  }

  return card;
}

export function renderBattle(allyLaneEl, enemyLaneEl, logEl, battle, onUseSpecial) {
  allyLaneEl.innerHTML = '';
  enemyLaneEl.innerHTML = '';

  battle.allies.forEach((u) => allyLaneEl.appendChild(buildUnitCard(u, onUseSpecial)));
  battle.enemies.forEach((u) => enemyLaneEl.appendChild(buildUnitCard(u, onUseSpecial)));

  logEl.innerHTML = battle.log
    .slice(-8)
    .map((line) => `<div class="battle-log__line">${line}</div>`)
    .join('');
  logEl.scrollTop = logEl.scrollHeight;
}
