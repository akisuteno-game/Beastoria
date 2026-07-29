/* ============================================================
   transformation.js
   異姿化システム

   仕様: 異姿化は基本形(進化段階1・未進化・未異姿化)からのみ、
   専用アイテムを消費して一度だけ発生する。異姿化後は通常の
   進化ルートではなく、別の進化ルート(evolutionsAlt.js)を歩む。
   ============================================================ */

import { getTransformationData } from '../data/transformations.js';
import { scaleStats } from '../utils/statUtils.js';

// 異姿化データが存在し、まだ基本形のままの個体にのみ許可する
export function canTransform(instance) {
  if (instance.evolutionStage !== 1 || instance.transformationStage !== 0) return false;
  return !!getTransformationData(instance.speciesId);
}

// 「異姿化できる状態で、かつ専用アイテムを実際に持っている」場合のみtrue。
// アイテムを持っていない場合はUI側で存在自体を出さないようにするための判定。
export function hasTransformationItemReady(instance, inventory) {
  if (!canTransform(instance)) return false;
  const data = getTransformationData(instance.speciesId);
  return inventory.hasItem(data.requiredItemId, 1);
}

export function transformMonster(instance, inventory) {
  if (!canTransform(instance)) {
    return { success: false, reason: 'transform-not-available' };
  }
  const data = getTransformationData(instance.speciesId);
  if (!inventory.hasItem(data.requiredItemId, 1)) {
    return { success: false, reason: 'missing-item' };
  }

  inventory.consumeItem(data.requiredItemId, 1);
  instance.transformationStage = 1;
  instance.name = data.name;
  instance.stats = scaleStats(instance.baseStats, data.statGrowth);

  return { success: true };
}
