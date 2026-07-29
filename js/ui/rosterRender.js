/* ============================================================
   rosterRender.js
   所持モンスター一覧・簡易図鑑の描画
   ============================================================ */

import { ATTRIBUTES, rarityToStars } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';

function stageLabel(instance) {
  if (instance.transformationStage > 0) return `異姿化 第${instance.transformationStage}段階`;
  if (instance.evolutionStage >= 2) return '進化第2形態';
  return '基本形態';
}

function buildOwnedCard(instance, onSelect) {
  const attr = ATTRIBUTES[instance.attribute];
  const card = document.createElement('div');
  card.className = 'monster-card';

  card.innerHTML = `
    <div class="panel">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name">${instance.name}</div>
      <span class="attr-badge ${attr.badgeClass}">${attr.label}属性</span>
      <div class="monster-card__type">${stageLabel(instance)}</div>
      <div class="rarity">${rarityToStars(instance.rarity)}</div>
    </div>
  `;

  renderPlaceholderSprite(card.querySelector('canvas'), attr.color);
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
