/* ============================================================
   wildEncounter.js
   野生モンスターの生成(レベルに応じてステータスを計算する)

   マップの敵グループは、種族id・レベル・配置(前衛/後衛)だけを
   指定すれば良い。実際のステータスはここでプレイヤーのレベルアップと
   同じ計算式を使って組み立てる(タマゴから生まれた同じ仕組みの
   モンスター、という設定に合わせている)。
   ============================================================ */

import { WILD_SPECIES } from '../data/wildSpecies.js';
import { levelMultiplier } from '../utils/statUtils.js';

let _wildSeq = 0;

/**
 * @param {string} speciesId wildSpecies.jsのキー
 * @param {number} level 敵のレベル
 * @param {'front'|'back'} row 配置
 * @param {number} [bossMult] ボス格に使う追加ステータス倍率(既定1)
 */
export function wildEnemy(speciesId, level, row, bossMult = 1) {
  const species = WILD_SPECIES[speciesId];
  if (!species) throw new Error(`unknown wild species: ${speciesId}`);

  _wildSeq += 1;
  const mult = levelMultiplier(level) * bossMult;
  const stats = {};
  Object.keys(species.baseStats).forEach((key) => {
    stats[key] = Math.round(species.baseStats[key] * mult);
  });

  return {
    id: `${speciesId}-${_wildSeq}`,
    name: species.name,
    attribute: species.attribute,
    row,
    stats,
  };
}

// 複数体まとめて生成するショートハンド。
// entries: [{speciesId, level, row, bossMult?}, ...]
export function wildGroup(entries) {
  return entries.map((e) => wildEnemy(e.speciesId, e.level, e.row, e.bossMult ?? 1));
}
