/* ============================================================
   evolution.js
   進化システム

   仕様: 全モンスターは2回進化する(計3形態)。進化には現在の
   主属性(attributes[0])の属性石20個を消費する。
   異姿化合成(属性の変化)とは独立した仕組みで、進化段階が
   上がっても異姙化合成は引き続き行える。
   ============================================================ */

import { getNextEvolutionData } from '../data/evolutions.js';
import { recomputeStats } from './leveling.js';
import { updateDisplayName } from './nameDisplay.js';

export const EVOLUTION_STONE_COST = 20;
export const MAX_EVOLUTION_STAGE = 3;

export function canEvolve(instance) {
  if (instance.evolutionStage >= MAX_EVOLUTION_STAGE) return false;
  return !!getNextEvolutionData(instance.speciesId, instance.evolutionStage);
}

export function evolveMonster(instance, inventory) {
  if (!canEvolve(instance)) {
    return { success: false, reason: 'evolve-not-available' };
  }
  const primaryAttribute = instance.attributes[0];
  if (!inventory.hasStones(primaryAttribute, EVOLUTION_STONE_COST)) {
    return { success: false, reason: 'not-enough-stones' };
  }

  const evo = getNextEvolutionData(instance.speciesId, instance.evolutionStage);
  inventory.consumeStones(primaryAttribute, EVOLUTION_STONE_COST);

  instance.evolutionStage = evo.stage;
  instance.coreName = evo.name;
  updateDisplayName(instance); // 異姙化で得た属性パーツを引き継いだまま名前を更新
  instance.formGrowth = evo.statGrowth;
  recomputeStats(instance);

  return { success: true };
}
