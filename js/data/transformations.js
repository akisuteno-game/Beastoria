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
  mizmol: {
    name: 'ミズモル(深潮)',
    requiredItemId: 'tide-pearl',
    statGrowth: { hp: 1.3, atk: 1.1, def: 1.2, spd: 1.0 },
  },
  leafy: {
    name: 'リーフィ(月光)',
    requiredItemId: 'moon-leaf',
    statGrowth: { hp: 1.1, atk: 1.1, def: 1.1, spd: 1.4 },
  },
  kokerin: {
    name: 'コケリン(星影)',
    requiredItemId: 'starlit-acorn',
    statGrowth: { hp: 1.2, atk: 1.1, def: 1.2, spd: 1.4 },
  },
  shizuku: {
    name: 'シズック(深淵)',
    requiredItemId: 'abyssal-shell',
    statGrowth: { hp: 1.3, atk: 1.1, def: 1.4, spd: 1.0 },
  },
  pachitto: {
    name: 'パチット(灼熱)',
    requiredItemId: 'spark-core',
    statGrowth: { hp: 1.1, atk: 1.4, def: 1.0, spd: 1.3 },
  },
};

export function getTransformationData(speciesId) {
  return TRANSFORMATIONS[speciesId] ?? null;
}
