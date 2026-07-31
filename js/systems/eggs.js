/* ============================================================
   eggs.js (system)
   タマゴ孵化システム
   ============================================================ */

import { EGG_MONSTERS } from '../data/eggMonsters.js';
import { createMonsterInstance } from '../data/monsters.js';

function pickWeighted(pool) {
  const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of pool) {
    roll -= entry.weight;
    if (roll <= 0) return entry.speciesId;
  }
  return pool[pool.length - 1].speciesId;
}

// タマゴを1個消費して孵化させる。成功すれば生まれたモンスターの
// インスタンスを返す(呼び出し側でrosterに追加する)。
export function hatchEgg(eggType, inventory) {
  if (!inventory.hasItem(eggType.id, 1)) {
    return { success: false, reason: 'no-egg' };
  }
  inventory.consumeItem(eggType.id, 1);

  const speciesId = pickWeighted(eggType.pool);
  const species = EGG_MONSTERS.find((m) => m.id === speciesId);
  if (!species) {
    return { success: false, reason: 'unknown-species' };
  }

  const instance = createMonsterInstance(species);
  return { success: true, instance };
}
