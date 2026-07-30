/* ============================================================
   mapNodes.js
   探索マップデータ(分岐あり)

   ノードは {id, type, label, next:[次のノードid...]} のグラフ構造。
   nextが複数あるノードをクリアすると、その先の複数ルートが同時に
   開放される(プレイヤーはどちらか片方を選んで進む)。選ばなかった
   方はその周回では閉じる。

   マップ構成(森の遺跡):
     n1(森の入口・バトル)
       ├─ n2a(近道の宝箱)
       └─ n2b(渓流のほとり・バトル / 遠回りだが敵が強い)
     どちらも n3(祠) へ合流
       └─ n4(洞窟・バトル)
             └─ n5(ボス)
   ============================================================ */

import { FOREST_PATH_GROUP, RIVERSIDE_GROUP, CAVE_GROUP, RUIN_BOSS_GROUP } from './enemies.js';

export const FOREST_MAP = {
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '森の入口',
      enemyGroup: FOREST_PATH_GROUP, xpReward: 20,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '近道の宝箱',
      reward: { stones: { attribute: 'forest', amount: 5 } },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '渓流のほとり(遠回り)',
      enemyGroup: RIVERSIDE_GROUP, xpReward: 35,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '苔むした祠',
      reward: {
        items: [
          { itemId: 'ember-shard', amount: 1 },
          { itemId: 'tide-pearl', amount: 1 },
          { itemId: 'moon-leaf', amount: 1 },
        ],
      },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '古びた洞窟',
      enemyGroup: CAVE_GROUP, xpReward: 40,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '遺跡の番人',
      enemyGroup: RUIN_BOSS_GROUP, xpReward: 80,
      next: [],
    },
  },
};

export const NODE_TYPE_LABEL = {
  battle: 'バトル',
  treasure: '宝箱',
  boss: 'ボス',
};
