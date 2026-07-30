/* ============================================================
   statUtils.js
   ステータス計算の共通処理

   最終ステータス = 基礎ステータス × (進化/異姿化による成長倍率)
                    × (レベルによる成長倍率)
   ============================================================ */

const LEVEL_GROWTH_PER_LEVEL = 0.08; // レベル1につき+8%(仮)

export function levelMultiplier(level) {
  return 1 + (level - 1) * LEVEL_GROWTH_PER_LEVEL;
}

// growth: {hp,atk,def,spd} の倍率(進化・異姿化していない基本形は全て1)
export function computeFinalStats(baseStats, growth, level) {
  const lvlMult = levelMultiplier(level);
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    result[key] = Math.round(baseStats[key] * (growth[key] ?? 1) * lvlMult);
  });
  return result;
}

// 後方互換(進化・異姿化データ側で使用): 倍率のみを掛けた値を返す
export function scaleStats(baseStats, growth) {
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    result[key] = Math.round(baseStats[key] * (growth[key] ?? 1));
  });
  return result;
}
