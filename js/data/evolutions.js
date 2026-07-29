/* ============================================================
   evolutions.js
   進化データ

   仕様: 全モンスターは進化段階を2段階持つ。進化には該当属性の
   属性石20個を消費し、進化時にその属性で固定される(以後、
   属性を変える手段があっても変更不可になる想定)。

   ※ 進化後の名称・ステータス伸び率は仮値。バランス調整フェーズで
     正式に詰める。
   ============================================================ */

// speciesId -> 進化段階2以降の定義(段階1=baseStatsそのものなので、
// ここには段階2の情報のみを持たせる)
export const EVOLUTIONS = {
  fangle: {
    stage: 2,
    name: 'フレイガル',
    statGrowth: { hp: 1.6, atk: 1.8, def: 1.5, spd: 1.4 }, // baseStats倍率
  },
  mizmol: {
    stage: 2,
    name: 'アクアレイス',
    statGrowth: { hp: 1.7, atk: 1.4, def: 1.7, spd: 1.4 },
  },
  leafy: {
    stage: 2,
    name: 'フォレスティア',
    statGrowth: { hp: 1.5, atk: 1.4, def: 1.5, spd: 1.7 },
  },
};

export function getEvolutionData(speciesId) {
  return EVOLUTIONS[speciesId] ?? null;
}
