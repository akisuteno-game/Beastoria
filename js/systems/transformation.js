/* ============================================================
   transformation.js
   異姿化システム

   仕様: 基本形(進化段階1)からのみ発生しうる特殊変身。最大3段階。
   進化済み(段階2)の個体は対象外とする。
   ============================================================ */

import { getTransformationPath } from '../data/transformations.js';
import { scaleStats } from '../utils/statUtils.js';

export function canTransform(instance) {
  const path = getTransformationPath(instance.speciesId);
  return instance.evolutionStage === 1 && instance.transformationStage < path.length;
}

export function nextTransformationStep(instance) {
  const path = getTransformationPath(instance.speciesId);
  return path[instance.transformationStage] ?? null;
}

export function transformMonster(instance, inventory) {
  if (!canTransform(instance)) {
    return { success: false, reason: 'transform-not-available' };
  }
  const step = nextTransformationStep(instance);
  if (!step) {
    return { success: false, reason: 'no-more-stages' };
  }
  if (!inventory.hasCrystals(step.crystalCost)) {
    return { success: false, reason: 'not-enough-crystals' };
  }

  inventory.consumeCrystals(step.crystalCost);
  instance.transformationStage += 1;
  instance.name = step.name;
  instance.stats = scaleStats(instance.baseStats, step.statGrowth);

  return { success: true };
}
