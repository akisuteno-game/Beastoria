/* ============================================================
   battleRender.js
   バトル画面の描画

   レイアウト: 上=味方(左)/敵(右)のバトルフィールド、
   下=左にログ・中央に獣魂技の操作パネル。
   ============================================================ */

import { renderAttrBadgesHtml } from '../utils/attrBadges.js';

function buildUnitCard(unit) {
  const card = document.createElement('div');
  card.className = `unit-card panel ${unit.alive ? '' : 'unit-card--down'}`;
  card.dataset.unitId = unit.unitId;

  const hpPct = Math.round((unit.hp / unit.maxHp) * 100);
  const gaugePct = unit.side === 'ally' ? Math.round((unit.gauge / unit.gaugeMax) * 100) : null;
  const isReady = unit.side === 'ally' && unit.alive && unit.gauge >= unit.gaugeMax;

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
    ${isReady ? `<span class="unit-card__ready">発動可能↓</span>` : ''}
    ${!unit.alive ? `<span class="unit-card__ko">戦闘不能</span>` : ''}
  `;

  return card;
}

function buildSpecialPanel(container, allies, onUseSpecial) {
  const readyAllies = allies.filter((u) => u.alive && u.gauge >= u.gaugeMax);

  if (readyAllies.length === 0) {
    container.innerHTML = `<span class="battle-special-panel__hint">獣魂技のゲージが溜まると、ここから発動できます</span>`;
    return;
  }

  container.innerHTML = '';
  readyAllies.forEach((unit) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn--special battle-special-panel__btn';
    btn.innerHTML = `
      <span class="battle-special-panel__caster">${unit.name}</span>
      <span class="battle-special-panel__move">${unit.specialName}</span>
    `;
    btn.title = unit.specialDescription || '';
    btn.addEventListener('click', () => onUseSpecial(unit.unitId));
    container.appendChild(btn);
  });
}

export function renderBattle(allyLaneEl, enemyLaneEl, logEl, specialPanelEl, battle, onUseSpecial) {
  allyLaneEl.innerHTML = '';
  enemyLaneEl.innerHTML = '';

  battle.allies.forEach((u) => allyLaneEl.appendChild(buildUnitCard(u)));
  battle.enemies.forEach((u) => enemyLaneEl.appendChild(buildUnitCard(u)));

  logEl.innerHTML = battle.log
    .slice(-8)
    .map((line) => `<div class="battle-log__line">${line}</div>`)
    .join('');
  logEl.scrollTop = logEl.scrollHeight;

  buildSpecialPanel(specialPanelEl, battle.allies, onUseSpecial);
}
