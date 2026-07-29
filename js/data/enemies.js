/* ============================================================
   enemies.js
   デモ用の敵グループデータ

   ※ 正式な敵データベースや出現テーブルは探索機能の実装時に
     別途設計する。ここではバトルシステム検証用の固定編成のみ。
   ============================================================ */

export const SAMPLE_ENEMY_GROUP = [
  { id: 'e-forest-1', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 26, atk: 8, def: 4, spd: 7 } },
  { id: 'e-forest-2', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 26, atk: 8, def: 4, spd: 7 } },
  { id: 'e-fire-1',   name: 'エンバーバット', attribute: 'fire',   row: 'front', stats: { hp: 20, atk: 10, def: 3, spd: 11 } },
  { id: 'e-water-1',  name: 'ティアクラブ',   attribute: 'water',  row: 'back',  stats: { hp: 34, atk: 6, def: 9, spd: 4 } },
];
