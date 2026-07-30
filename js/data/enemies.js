/* ============================================================
   enemies.js
   敵グループデータ

   ※ 正式な敵データベースや出現テーブル(ランダム抽選など)は
     別途設計する。ここでは探索マップの各ノードに割り当てる
     固定編成のみを用意している。
   バランス調整: 攻撃力を全体的に引き下げ、ボスのHPも下げて
   「勝てるが際どい」くらいの手応えを狙っている(仮の数値)。
   ============================================================ */

export const FOREST_PATH_GROUP = [
  { id: 'e-forest-1', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 22, atk: 6, def: 3, spd: 8 } },
  { id: 'e-forest-2', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 22, atk: 6, def: 3, spd: 8 } },
];

export const RIVERSIDE_GROUP = [
  { id: 'e-water-1', name: 'ティアクラブ',   attribute: 'water', row: 'front', stats: { hp: 30, atk: 7, def: 8, spd: 5 } },
  { id: 'e-fire-1',   name: 'エンバーバット', attribute: 'fire',  row: 'front', stats: { hp: 20, atk: 8, def: 3, spd: 10 } },
  { id: 'e-water-2',  name: 'ティアクラブ',   attribute: 'water', row: 'back',  stats: { hp: 30, atk: 7, def: 8, spd: 5 } },
];

export const CAVE_GROUP = [
  { id: 'e-cave-1', name: 'ストーンモール', attribute: 'forest', row: 'front', stats: { hp: 34, atk: 7, def: 10, spd: 4 } },
  { id: 'e-cave-2', name: 'エンバーバット', attribute: 'fire',  row: 'back',  stats: { hp: 18, atk: 9, def: 2, spd: 10 } },
];

export const RUIN_BOSS_GROUP = [
  { id: 'e-boss-1',  name: '古の番人イグナロス', attribute: 'fire', row: 'front', stats: { hp: 58, atk: 11, def: 9, spd: 8 } },
  { id: 'e-boss-add', name: '守護の残滓', attribute: 'forest', row: 'back', stats: { hp: 22, atk: 5, def: 5, spd: 6 } },
];

// 旧バトル検証用(互換のため残置)
export const SAMPLE_ENEMY_GROUP = FOREST_PATH_GROUP;
