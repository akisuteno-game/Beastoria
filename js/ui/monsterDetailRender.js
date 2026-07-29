/* ============================================================
   monsterDetailRender.js
   モンスター詳細画面の描画(進化・異姿化の操作を含む)
   ============================================================ */

import { ATTRIBUTES, rarityToStars, ROLE_LABEL } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { canEvolve, EVOLUTION_STONE_COST } from '../systems/evolution.js';
import { canTransform, nextTransformationStep } from '../systems/transformation.js';
import { getTransformationPath } from '../data/transformations.js';

export function renderMonsterDetail(container, instance, inventory, handlers) {
  const attr = ATTRIBUTES[instance.attribute];
  const path = getTransformationPath(instance.speciesId);

  const evolveOk = canEvolve(instance);
  const stoneCount = inventory.stones[instance.attribute] ?? 0;
  const stoneOk = stoneCount >= EVOLUTION_STONE_COST;

  const transformOk = canTransform(instance);
  const nextStep = nextTransformationStep(instance);
  const crystalOk = nextStep ? inventory.crystals >= nextStep.crystalCost : false;

  container.innerHTML = `
    <div class="panel panel--raised monster-detail__main">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name" style="font-size: var(--fs-lg);">${instance.name}</div>
      <span class="attr-badge ${attr.badgeClass}">${attr.label}属性${instance.attributeLocked ? '(固定)' : ''}</span>
      <div class="monster-card__type">${ROLE_LABEL[instance.role]}</div>
      <div class="rarity">${rarityToStars(instance.rarity)}</div>

      <ul class="stat-list">
        <li>HP <span>${instance.stats.hp}</span></li>
        <li>ATK <span>${instance.stats.atk}</span></li>
        <li>DEF <span>${instance.stats.def}</span></li>
        <li>SPD <span>${instance.stats.spd}</span></li>
      </ul>
    </div>

    <div class="panel monster-detail__section">
      <h3 class="section-title">進化 (${instance.evolutionStage} / 2)</h3>
      ${
        evolveOk
          ? `<p class="detail-note">${attr.label}属性石 ${EVOLUTION_STONE_COST}個が必要(所持: ${stoneCount}個)</p>
             <button id="evolve-btn" class="btn ${stoneOk ? '' : 'btn--ghost'}" ${stoneOk ? '' : 'disabled'}>進化させる</button>`
          : `<p class="detail-note">${instance.evolutionStage >= 2 ? 'これ以上は進化しません' : '異姿化済みのため進化できません'}</p>`
      }
    </div>

    <div class="panel monster-detail__section">
      <h3 class="section-title">異姿化 (${instance.transformationStage} / ${path.length || '—'})</h3>
      ${
        path.length === 0
          ? `<p class="detail-note">このモンスターの異姿化データは未設定です</p>`
          : transformOk
          ? `<p class="detail-note">次の姿「${nextStep.name}」には異姿結晶 ${nextStep.crystalCost}個が必要(所持: ${inventory.crystals}個)</p>
             <button id="transform-btn" class="btn ${crystalOk ? '' : 'btn--ghost'}" ${crystalOk ? '' : 'disabled'}>異姿化させる</button>`
          : `<p class="detail-note">${instance.evolutionStage !== 1 ? '進化した個体は異姿化できません' : '最終形態です'}</p>`
      }
    </div>
  `;

  renderPlaceholderSprite(container.querySelector('canvas'), attr.color);

  const evolveBtn = container.querySelector('#evolve-btn');
  if (evolveBtn) evolveBtn.addEventListener('click', () => handlers.onEvolve(instance.instanceId));

  const transformBtn = container.querySelector('#transform-btn');
  if (transformBtn) transformBtn.addEventListener('click', () => handlers.onTransform(instance.instanceId));
}
