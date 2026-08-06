/* ============================================================
   statUtils.js
   ステータス計算の共通処理

   最終ステータス = 基礎ステータス
                    × (進化による成長倍率)
                    × (レベルによる成長倍率)
                    × (異姙化合成による倍率: 複合属性化・同属性強化)
                    × (個体値による微差: 同じ種族でも個体ごとに変わる)
   ============================================================ */

const LEVEL_GROWTH_PER_LEVEL = 0.08; // レベル1につき+8%(仮)
const NEW_ATTRIBUTE_STAT_BONUS = 0.15; // 異姙化合成: 属性1つ増えるごとの追加倍率
const REINFORCE_STAT_BONUS = 0.1; // 異姙化合成: 同属性強化1回ごとの追加倍率
export const IV_MAX = 10; // 個体値の最大値(1ポイントにつき+1%)
const IV_STATS = ['hp', 'atk', 'def', 'spd'];

export function levelMultiplier(level) {
  return 1 + (level - 1) * LEVEL_GROWTH_PER_LEVEL;
}

// 個体値(0〜IV_MAX)をステータスごとにランダムで振る
export function rollIVs() {
  const ivs = {};
  IV_STATS.forEach((key) => {
    ivs[key] = Math.floor(Math.random() * (IV_MAX + 1));
  });
  return ivs;
}

// 異姙化合成による総合ステータス倍率
export function getTransformScalar(instance) {
  const attrBonus = 1 + NEW_ATTRIBUTE_STAT_BONUS * (instance.attributes.length - 1);
  const reinforceBonus = 1 + REINFORCE_STAT_BONUS * instance.reinforceCount;
  return attrBonus * reinforceBonus;
}

// growth: {hp,atk,def,spd} の倍率(進化していない基本形は全て1)
// transformScalar: 異姙化合成による全ステータス一律倍率(既定1)
// ivs: 個体値(0〜IV_MAX、省略時はボーナス無し)
export function computeFinalStats(baseStats, growth, level, transformScalar = 1, ivs = null) {
  const lvlMult = levelMultiplier(level);
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    const ivMult = ivs ? 1 + (ivs[key] ?? 0) / 100 : 1; // 個体値1につき+1%
    result[key] = Math.round(
      baseStats[key] * (growth[key] ?? 1) * lvlMult * transformScalar * ivMult
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
