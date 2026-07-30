/* ============================================================
   mapNodes.js
   探索マップデータ

   ※ ここでは検証用に一本道のマップを1つだけ用意する。
     分岐や複数マップの切り替えは今後のフェーズで拡張する。
   ============================================================ */

import { FOREST_PATH_GROUP, RIVERSIDE_GROUP, RUIN_BOSS_GROUP } from './enemies.js';

export const FOREST_MAP = [
  { id: 'n1', type: 'battle', label: '森の入口', enemyGroup: FOREST_PATH_GROUP, xpReward: 20 },
  { id: 'n2', type: 'treasure', label: '古い宝箱', reward: { stones: { attribute: 'forest', amount: 5 } } },
  { id: 'n3', type: 'battle', label: '渓流のほとり', enemyGroup: RIVERSIDE_GROUP, xpReward: 30 },
  { id: 'n4', type: 'treasure', label: '苔むした祠', reward: { item: { itemId: 'ember-shard', amount: 1 } } },
  { id: 'n5', type: 'boss', label: '遺跡の番人', enemyGroup: RUIN_BOSS_GROUP, xpReward: 80 },
];

export const NODE_TYPE_LABEL = {
  battle: 'バトル',
  treasure: '宝箱',
  boss: 'ボス',
};
