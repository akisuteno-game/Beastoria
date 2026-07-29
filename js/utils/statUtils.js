/* ============================================================
   statUtils.js
   ステータス倍率計算の共通処理
   ============================================================ */

export function scaleStats(baseStats, growth) {
  const result = {};
  Object.keys(baseStats).forEach((key) => {
    result[key] = Math.round(baseStats[key] * (growth[key] ?? 1));
  });
  return result;
}
