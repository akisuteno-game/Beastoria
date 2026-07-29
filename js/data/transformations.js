/* ============================================================
   transformations.js
   異姿化データ

   仕様: 異姿化は基本形(進化段階1)からのみ、特定の専用アイテムを
   使うことで一度だけ発生する。異姿化後はTRANSFORMATIONSの姿を
   起点に、別の進化ルート(evolutionsAlt.js)を歩む。

   ※ 発生後の演出や確率要素は未確定。現時点ではファングルにのみ
     サンプルデータを用意している。
   ============================================================ */

export const TRANSFORMATIONS = {
  fangle: {
    name: 'ファングル(黒炎)',
    requiredItemId: 'ember-shard',
    statGrowth: { hp: 1.1, atk: 1.3, def: 1.0, spd: 1.2 },
  },
};

export function getTransformationData(speciesId) {
  return TRANSFORMATIONS[speciesId] ?? null;
}
