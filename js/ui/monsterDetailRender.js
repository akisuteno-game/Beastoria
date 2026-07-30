/* ============================================================
   monsterDetailRender.js
   モンスター詳細画面の描画(進化・異姿化の操作を含む)

   ※ 異姿化は「専用アイテムを実際に持っている場合」だけセクションを
     表示する。持っていない段階で存在をほのめかすと、進化のように
     見えて面白くなくなるため、UI上ではあえて何も出さない。
   ============================================================ */

import { ATTRIBUTES, rarityToStars, ROLE_LABEL } from '../data/constants.js';
import { renderPlaceholderSprite } from '../utils/spriteGen.js';
import { canEvolve, EVOLUTION_STONE_COST, MAX_EVOLUTION_STAGE } from '../systems/evolution.js';
import { canTransform, hasTransformationItemReady } from '../systems/transformation.js';
import { xpToNextLevel } from '../systems/leveling.js';

export function renderMonsterDetail(container, instance, inventory, handlers) {
  const attr = ATTRIBUTES[instance.attribute];

  const evolveOk = canEvolve(instance);
  const stoneCount = inventory.stones[instance.attribute] ?? 0;
  const stoneOk = stoneCount >= EVOLUTION_STONE_COST;

  const alreadyTransformed = instance.transformationStage > 0;
  const transformReady = !alreadyTransformed && hasTransformationItemReady(instance, inventory);
  const showTransformSection = alreadyTransformed || transformReady;

  const xpNeeded = xpToNextLevel(instance.level);
  const xpPct = Math.round((instance.xp / xpNeeded) * 100);

  container.innerHTML = `
    <div class="panel panel--raised monster-detail__main">
      <canvas class="monster-card__sprite" width="64" height="64"></canvas>
      <div class="monster-card__name" style="font-size: var(--fs-lg);">${instance.name}</div>
      <span class="attr-badge ${attr.badgeClass}">${attr.label}属性${instance.attributeLocked ? '(固定)' : ''}</span>
      <div class="monster-card__type">${ROLE_LABEL[instance.role]}</div>
      <div class="rarity">${rarityToStars(instance.rarity)}</div>

      <div class="detail-level">Lv. ${instance.level}</div>
      <div class="bar bar--xp"><div class="bar__fill" style="width:${xpPct}%"></div></div>
      <span class="bar__label">EXP ${instance.xp} / ${xpNeeded}</span>

      <ul class="stat-list">
        <li>HP <span>${instance.stats.hp}</span></li>
        <li>ATK <span>${instance.stats.atk}</span></li>
        <li>DEF <span>${instance.stats.def}</span></li>
        <li>SPD <span>${instance.stats.spd}</span></li>
      </ul>
    </div>

    <div class="panel monster-detail__section">
      <h3 class="section-title">進化 (${instance.evolutionStage} / ${MAX_EVOLUTION_STAGE})</h3>
      ${
        evolveOk
          ? `<p class="detail-note">${attr.label}属性石 ${EVOLUTION_STONE_COST}個が必要(所持: ${stoneCount}個)</p>
             <button id="evolve-btn" class="btn ${stoneOk ? '' : 'btn--ghost'}" ${stoneOk ? '' : 'disabled'}>進化させる</button>`
          : `<p class="detail-note">${instance.evolutionStage >= MAX_EVOLUTION_STAGE ? 'これ以上は進化しません' : '進化データがありません'}</p>`
      }
    </div>

    ${
      showTransformSection
        ? `<div class="panel monster-detail__section">
             <h3 class="section-title">異姿化</h3>
             ${
               alreadyTransformed
                 ? `<p class="detail-note">この個体はすでに異姿化しています。以後は異姿化後専用の進化ルートを歩みます。</p>`
                 : `<p class="detail-note">専用のアイテムを使うと、姿が変わるようだ…</p>
                    <button id="transform-btn" class="btn">アイテムを使う</button>`
             }
           </div>`
        : ''
    }
  `;

  renderPlaceholderSprite(container.querySelector('canvas'), attr.color);

  const evolveBtn = container.querySelector('#evolve-btn');
  if (evolveBtn) evolveBtn.addEventListener('click', () => handlers.onEvolve(instance.instanceId));

  const transformBtn = container.querySelector('#transform-btn');
  if (transformBtn) transformBtn.addEventListener('click', () => handlers.onTransform(instance.instanceId));
}
