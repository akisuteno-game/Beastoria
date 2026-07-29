/* ============================================================
   evolution.js
   進化システム

   仕様: 進化には該当属性の属性石20個を消費し、進化時にその属性で
   固定される(以後、属性は変更不可になる)。異姿化済みの個体は
   別ルートを歩んでいるため進化できない扱いとする。
   ============================================================ */

import { getEvolutionData } from '../data/evolutions.js';
import { scaleStats } from '../utils/statUtils.js';

export const EVOLUTION_STONE_COST = 20;

export function canEvolve(instance) {
  return (
    instance.evolutionStage < 2 &&
    instance.transformationStage === 0 &&
    !!getEvolutionData(instance.speciesId)
  );
}

export function evolveMonster(instance, inventory) {
  if (!canEvolve(instance)) {
    return { success: false, reason: 'evolve-not-available' };
  }
  if (!inventory.hasStones(instance.attribute, EVOLUTION_STONE_COST)) {
    return { success: false, reason: 'not-enough-stones' };
  }

  inventory.consumeStones(instance.attribute, EVOLUTION_STONE_COST);

  const evo = getEvolutionData(instance.speciesId);
  instance.evolutionStage = 2;
  instance.name = evo.name;
  instance.attributeLocked = true;
  instance.stats = scaleStats(instance.baseStats, evo.statGrowth);

  return { success: true };
}
