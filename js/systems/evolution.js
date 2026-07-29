/* ============================================================
   evolution.js
   進化システム

   仕様: 全モンスターは2回進化する(計3形態)。異姿化していない
   個体は通常ルート(evolutions.js)、異姿化済みの個体は別ルート
   (evolutionsAlt.js)を進化元データとして参照する。
   進化には該当属性の属性石20個を消費し、初回進化時に属性を固定する。
   ============================================================ */

import { getNextEvolutionData } from '../data/evolutions.js';
import { getNextAltEvolutionData } from '../data/evolutionsAlt.js';
import { scaleStats } from '../utils/statUtils.js';

export const EVOLUTION_STONE_COST = 20;
export const MAX_EVOLUTION_STAGE = 3;

// 異姿化しているかどうかで、進化元データの参照先を切り替える
function getNextEvolutionForInstance(instance) {
  return instance.transformationStage > 0
    ? getNextAltEvolutionData(instance.speciesId, instance.evolutionStage)
    : getNextEvolutionData(instance.speciesId, instance.evolutionStage);
}

export function canEvolve(instance) {
  if (instance.evolutionStage >= MAX_EVOLUTION_STAGE) return false;
  return !!getNextEvolutionForInstance(instance);
}

export function evolveMonster(instance, inventory) {
  if (!canEvolve(instance)) {
    return { success: false, reason: 'evolve-not-available' };
  }
  if (!inventory.hasStones(instance.attribute, EVOLUTION_STONE_COST)) {
    return { success: false, reason: 'not-enough-stones' };
  }

  const evo = getNextEvolutionForInstance(instance);
  inventory.consumeStones(instance.attribute, EVOLUTION_STONE_COST);

  instance.evolutionStage = evo.stage;
  instance.name = evo.name;
  instance.attributeLocked = true;
  instance.stats = scaleStats(instance.baseStats, evo.statGrowth);

  return { success: true };
}
