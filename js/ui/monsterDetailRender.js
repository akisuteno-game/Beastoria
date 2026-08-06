/* ============================================================
   monsterDetailRender.js
   モンスター詳細画面の描画(進化・異姙化合成の操作を含む)
   ============================================================ */

import { ATTRIBUTES, rarityToStars, ROLE_LABEL } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { renderAttrBadgesHtml, primaryAttrColor } from '../utils/attrBadges.js';
import { canEvolve, EVOLUTION_STONE_COST, MAX_EVOLUTION_STAGE } from '../systems/evolution.js';
import { canGainNewAttribute } from '../systems/transformSynthesis.js';

function buildSynthesisList(instance, inventory) {
  const ownedCrystalAttrs = Object.keys(inventory.crystals).filter((a) => inventory.crystals[a] > 0);

  if (ownedCrystalAttrs.length === 0) {
    return `<p class="detail-note">結晶を持っていません。バトルで敵を倒すとドロップします。</p>`;
  }

  return ownedCrystalAttrs
    .map((attrId) => {
      const attr = ATTRIBUTES[attrId];
      const already = instance.attributes.includes(attrId);
      const capReached = !already && !canGainNewAttribute(instance);
      const disabled = capReached;
      const actionLabel = already ? '強化する' : '新属性として合成';

      return `
        <div class="panel synthesis-item">
          <span class="attr-badge ${attr.badgeClass}">${attr.label}の結晶</span>
          <div class="shop-item__stock">所持: ${inventory.crystals[attrId]}個</div>
          <div class="detail-note">${already ? 'ステータス・獣魂技を強化' : capReached ? 'これ以上は異姙化できません' : '新しい属性を獲得(複合属性化)'}</div>
          <button class="btn btn--sm ${disabled ? 'btn--ghost' : ''}" data-attr="${attrId}" ${disabled ? 'disabled' : ''}>${actionLabel}</button>
        </div>
      `;
    })
    .join('');
}

export function renderMonsterDetail(container, instance, inventory, handlers) {
  const evolveOk = canEvolve(instance);
  const primaryAttribute = instance.attributes[0];
  const stoneAttr = ATTRIBUTES[primaryAttribute];
  const stoneCount = inventory.stones[primaryAttribute] ?? 0;
  const stoneOk = stoneCount >= EVOLUTION_STONE_COST;

  const xpNeeded = instance.level * 30;
  const xpPct = Math.round((instance.xp / xpNeeded) * 100);

  container.innerHTML = `
    <div class="panel panel--raised monster-detail__main">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name" style="font-size: var(--fs-lg);">${instance.name}</div>
      ${renderAttrBadgesHtml(instance.attributes)}
      <div class="monster-card__type">${ROLE_LABEL[instance.role]}</div>
      <div class="rarity">${rarityToStars(instance.rarity)}</div>

      <div class="detail-level">Lv. ${instance.level}</div>
      <div class="bar bar--xp"><div class="bar__fill" style="width:${xpPct}%"></div></div>
      <span class="bar__label">EXP ${instance.xp} / ${xpNeeded}</span>

      <ul class="stat-list">
        <li>HP <span>${instance.stats.hp} <em class="stat-list__iv">(個体値${instance.ivs?.hp ?? 0})</em></span></li>
        <li>ATK <span>${instance.stats.atk} <em class="stat-list__iv">(個体値${instance.ivs?.atk ?? 0})</em></span></li>
        <li>DEF <span>${instance.stats.def} <em class="stat-list__iv">(個体値${instance.ivs?.def ?? 0})</em></span></li>
        <li>SPD <span>${instance.stats.spd} <em class="stat-list__iv">(個体値${instance.ivs?.spd ?? 0})</em></span></li>
      </ul>
    </div>

    <div class="panel monster-detail__section">
      <h3 class="section-title">進化 (${instance.evolutionStage} / ${MAX_EVOLUTION_STAGE})</h3>
      ${
        evolveOk
          ? `<p class="detail-note">${stoneAttr.stoneName} ${EVOLUTION_STONE_COST}個が必要(所持: ${stoneCount}個)</p>
             <button id="evolve-btn" class="btn ${stoneOk ? '' : 'btn--ghost'}" ${stoneOk ? '' : 'disabled'}>進化させる</button>`
          : `<p class="detail-note">${instance.evolutionStage >= MAX_EVOLUTION_STAGE ? 'これ以上は進化しません' : '進化データがありません'}</p>`
      }
    </div>

    <div class="panel monster-detail__section">
      <h3 class="section-title">異姙化合成 (${instance.transformCount} / ${instance.maxTransform})${instance.reinforceCount > 0 ? ` ・ 強化${instance.reinforceCount}回` : ''}</h3>
      ${
        instance.maxTransform === 0
          ? `<p class="detail-note">このモンスターは異姙化合成に対応していません</p>`
          : buildSynthesisList(instance, inventory)
      }
    </div>
  `;

  renderPlaceholderSprite(container.querySelector('canvas'), primaryAttrColor(instance.attributes));

  const evolveBtn = container.querySelector('#evolve-btn');
  if (evolveBtn) evolveBtn.addEventListener('click', () => handlers.onEvolve(instance.instanceId));

  container.querySelectorAll('.synthesis-item button[data-attr]').forEach((btn) => {
    btn.addEventListener('click', () => handlers.onSynthesize(instance.instanceId, btn.dataset.attr));
  });
}
