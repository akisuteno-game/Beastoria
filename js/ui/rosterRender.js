/* ============================================================
   rosterRender.js
   所持モンスター一覧・簡易図鑑の描画
   ============================================================ */

import { rarityToStars } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { renderAttrBadgesHtml, primaryAttrColor } from '../utils/attrBadges.js';

function stageLabel(instance) {
  const evoLabel = instance.evolutionStage >= 2 ? `進化${instance.evolutionStage - 1}段階` : '基本形態';
  const parts = [evoLabel];
  if (instance.attributes.length > 1) parts.push(`複合属性×${instance.attributes.length}`);
  if (instance.reinforceCount > 0) parts.push(`強化${instance.reinforceCount}`);
  return parts.join(' ・ ');
}

function buildOwnedCard(instance, onSelect) {
  const card = document.createElement('div');
  card.className = 'monster-card';

  card.innerHTML = `
    <div class="panel">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name">${instance.name}</div>
      ${renderAttrBadgesHtml(instance.attributes)}
      <div class="monster-card__type">Lv.${instance.level} ・ ${stageLabel(instance)}</div>
      <div class="rarity">${rarityToStars(instance.rarity)}</div>
    </div>
  `;

  renderPlaceholderSprite(card.querySelector('canvas'), primaryAttrColor(instance.attributes));
  card.addEventListener('click', () => onSelect(instance.instanceId));

  return card;
}

function buildLockedCard() {
  const card = document.createElement('div');
  card.className = 'monster-card monster-card--locked';
  card.innerHTML = `
    <div class="panel">
      <div class="monster-card__sprite monster-card__sprite--locked">？</div>
      <div class="monster-card__name">？？？</div>
      <div class="monster-card__type">未発見</div>
    </div>
  `;
  return card;
}

export function renderRoster(container, roster, allSpecies, onSelect) {
  container.innerHTML = '';

  roster.list.forEach((instance) => {
    container.appendChild(buildOwnedCard(instance, onSelect));
  });

  const ownedSpeciesIds = new Set(roster.list.map((m) => m.speciesId));
  allSpecies
    .filter((species) => !ownedSpeciesIds.has(species.id))
    .forEach(() => container.appendChild(buildLockedCard()));
}
