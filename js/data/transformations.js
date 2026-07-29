/* ============================================================
   transformations.js
   異姿化データ

   仕様: 基本形(進化段階1)から発生しうる特殊な変身で、最大3段階
   まで存在しうる。通常の進化とは別軸の派生ルート。

   ※ 発生条件(何のアイテムが何個必要か等)は未確定のため、ここでは
     「異姿結晶」という仮アイテムを消費する形でシステムのみ検証する。
     正式な入手方法・演出は今後のフェーズで設計する。
     現時点ではファングルにのみサンプルデータを用意している。
   ============================================================ */

export const TRANSFORMATIONS = {
  fangle: [
    {
      stage: 1,
      name: 'ファングル(黒炎)',
      crystalCost: 1,
      statGrowth: { hp: 1.1, atk: 1.3, def: 1.0, spd: 1.2 },
    },
    {
      stage: 2,
      name: 'ファングル(業火)',
      crystalCost: 2,
      statGrowth: { hp: 1.2, atk: 1.5, def: 1.1, spd: 1.3 },
    },
    {
      stage: 3,
      name: 'ファングル(焦熱)',
      crystalCost: 3,
      statGrowth: { hp: 1.3, atk: 1.8, def: 1.2, spd: 1.4 },
    },
  ],
};

export function getTransformationPath(speciesId) {
  return TRANSFORMATIONS[speciesId] ?? [];
}
