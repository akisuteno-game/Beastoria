/* ============================================================
   leveling.js
   レベルアップシステム

   バトル勝利時に経験値を獲得し、必要経験値に達するとレベルが
   上がる。レベルが上がるたびにステータスを再計算する。
   ※ 必要経験値の式・成長率は仮値。バランス調整フェーズで詰める。
   ============================================================ */

import { computeFinalStats } from '../utils/statUtils.js';

export function xpToNextLevel(level) {
  return level * 50;
}

// instance.formGrowth(進化・異姿化による倍率)を踏まえてステータスを再計算する
export function recomputeStats(instance) {
  instance.stats = computeFinalStats(instance.baseStats, instance.formGrowth, instance.level);
}

export function addExperience(instance, amount) {
  instance.xp += amount;
  let leveledUp = false;

  while (instance.xp >= xpToNextLevel(instance.level)) {
    instance.xp -= xpToNextLevel(instance.level);
    instance.level += 1;
    leveledUp = true;
  }

  if (leveledUp) {
    recomputeStats(instance);
  }

  return { leveledUp, level: instance.level };
}
