/* ============================================================
   monsters.js
   モンスターデータ定義
   ※ ここでは初期スターター3体のみを実データとして持つ。
     進化・異姿化・獣魂技などの詳細スキーマは今後のフェーズで拡張する。
   ============================================================ */

import { computeFinalStats } from '../utils/statUtils.js';

// 所持モンスターの連番(仮のID発行用)
let _instanceSeq = 0;

// 図鑑データ(species)から実際に所持する1体のインスタンスを生成する
export function createMonsterInstance(species) {
  _instanceSeq += 1;
  const baseStats = { ...species.baseStats };
  const formGrowth = { hp: 1, atk: 1, def: 1, spd: 1 }; // 進化・異姿化前は等倍

  return {
    instanceId: `${species.id}-${_instanceSeq}`,
    speciesId: species.id,
    name: species.name,
    attribute: species.attribute,
    role: species.role,
    rarity: species.rarity,
    baseStats,
    formGrowth,
    level: 1,
    xp: 0,
    stats: computeFinalStats(baseStats, formGrowth, 1),
    evolutionStage: species.evolution.stage,
    attributeLocked: false,
    transformationStage: 0,
  };
}

// セーブデータ読み込み後、インスタンスIDの連番が重複しないように
// 読み込んだ所持モンスターの中で最大の連番まで進めておく
export function syncInstanceSeq(monsters) {
  monsters.forEach((m) => {
    const match = /-(\d+)$/.exec(m.instanceId);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > _instanceSeq) _instanceSeq = n;
    }
  });
}

export const STARTERS = [
  {
    id: 'fangle',
    name: 'ファングル',
    attribute: 'fire',
    role: 'attack',
    rarity: 1,
    baseStats: { hp: 32, atk: 12, def: 7, spd: 9 },
    evolution: { stage: 1, maxStage: 2, stoneCost: 20 },
  },
  {
    id: 'mizmol',
    name: 'ミズモル',
    attribute: 'water',
    role: 'defense',
    rarity: 1,
    baseStats: { hp: 40, atk: 7, def: 11, spd: 6 },
    evolution: { stage: 1, maxStage: 2, stoneCost: 20 },
  },
  {
    id: 'leafy',
    name: 'リーフィ',
    attribute: 'forest',
    role: 'support',
    rarity: 1,
    baseStats: { hp: 30, atk: 6, def: 8, spd: 10 },
    evolution: { stage: 1, maxStage: 2, stoneCost: 20 },
  },
];
