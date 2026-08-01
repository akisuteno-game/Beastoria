/* ============================================================
   statUtils.js
   ステータス計算の共通処理

   最終ステータス = 基礎ステータス
                    × (進化による成長倍率)
                    × (レベルによる成長倍率)
                    × (異姿化合成による倍率: 複合属性化・同属性強化)
   ============================================================ */

const LEVEL_GROWTH_PER_LEVEL = 0.08; // レベル1につき+8%(仮)
const NEW_ATTRIBUTE_STAT_BONUS = 0.15; // 異姿化合成: 属性1つ増えるごとの追加倍率
const REINFORCE_STAT_BONUS = 0.1; // 異姿化合成: 同属性強化1回ごとの追加倍率

export function levelMultiplier(level) {
  return 1 + (level - 1) * LEVEL_GROWTH_PER_LEVEL;
}

// 異姙化合成による総合ステータス倍率
export function getTransformScalar(instance) {
  const attrBonus = 1 + NEW_ATTRIBUTE_STAT_BONUS * (instance.attributes.length - 1);
  const reinforceBonus = 1 + REINFORCE_STAT_BONUS * instance.reinforceCount;
  return attrBonus * reinforceBonus;
}

// growth: {hp,atk,def,spd} の倍率(進化していない基本形は全て1)
// transformScalar: 異姿化合成による全ステータス一律倍率(既定1)
export function computeFinalStats(baseStats, growth, level, transformScalar = 1) {
  const lvlMult = levelMultiplier(level);
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    result[key] = Math.round(
      baseStats[key] * (growth[key] ?? 1) * lvlMult * transformScalar
    );
  });
  return result;
}

// 後方互換(進化データ側で使用): 倍率のみを掛けた値を返す
export function scaleStats(baseStats, growth) {
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    result[key] = Math.round(baseStats[key] * (growth[key] ?? 1));
  });
  return result;
}
