/* ============================================================
   forestMap.js
   マップ1: 森の遺跡(入門用)

   n1(森の入口・バトル)
     ├─ n2a(近道の宝箱)
     └─ n2b(渓流のほとり・バトル / 遠回りだが敵が強い)
   どちらも n3(祠) へ合流
     └─ n4(洞窟・バトル)
           └─ n5(ボス)
   ============================================================ */

const FOREST_PATH_GROUP = [
  { id: 'e-forest-1', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 22, atk: 6, def: 3, spd: 8 } },
  { id: 'e-forest-2', name: 'モスグレムリン', attribute: 'forest', row: 'front', stats: { hp: 22, atk: 6, def: 3, spd: 8 } },
];

const RIVERSIDE_GROUP = [
  { id: 'e-water-1', name: 'ティアクラブ',   attribute: 'water', row: 'front', stats: { hp: 30, atk: 7, def: 8, spd: 5 } },
  { id: 'e-fire-1',   name: 'エンバーバット', attribute: 'fire',  row: 'front', stats: { hp: 20, atk: 8, def: 3, spd: 10 } },
  { id: 'e-water-2',  name: 'ティアクラブ',   attribute: 'water', row: 'back',  stats: { hp: 30, atk: 7, def: 8, spd: 5 } },
];

const CAVE_GROUP = [
  { id: 'e-cave-1', name: 'ストーンモール', attribute: 'forest', row: 'front', stats: { hp: 34, atk: 7, def: 10, spd: 4 } },
  { id: 'e-cave-2', name: 'エンバーバット', attribute: 'fire',  row: 'back',  stats: { hp: 18, atk: 9, def: 2, spd: 10 } },
];

const RUIN_BOSS_GROUP = [
  { id: 'e-boss-1',  name: '古の番人イグナロス', attribute: 'fire', row: 'front', stats: { hp: 58, atk: 11, def: 9, spd: 8 } },
  { id: 'e-boss-add', name: '守護の残滓', attribute: 'forest', row: 'back', stats: { hp: 22, atk: 5, def: 5, spd: 6 } },
];

export const FOREST_MAP = {
  id: 'forest',
  name: '森の遺跡',
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '森の入口',
      enemyGroup: FOREST_PATH_GROUP, xpReward: 20, goldReward: 15,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '近道の宝箱',
      reward: { stones: { attribute: 'forest', amount: 5 }, gold: 10 },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '渓流のほとり(遠回り)',
      enemyGroup: RIVERSIDE_GROUP, xpReward: 35, goldReward: 25,
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
      enemyGroup: CAVE_GROUP, xpReward: 40, goldReward: 30,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '遺跡の番人',
      enemyGroup: RUIN_BOSS_GROUP, xpReward: 80, goldReward: 60,
      next: [],
    },
  },
};
