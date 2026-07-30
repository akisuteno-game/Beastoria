/* ============================================================
   coveMap.js
   マップ2: 水辺の入江(森の遺跡よりやや強め)
   ============================================================ */

const SHORE_GROUP = [
  { id: 'c-crab-1', name: '波兵ガニ', attribute: 'water', row: 'front', stats: { hp: 26, atk: 7, def: 4, spd: 7 } },
  { id: 'c-crab-2', name: '波兵ガニ', attribute: 'water', row: 'front', stats: { hp: 26, atk: 7, def: 4, spd: 7 } },
];

const RIPTIDE_GROUP = [
  { id: 'c-shark-1', name: '深潮のサメ', attribute: 'water', row: 'front', stats: { hp: 30, atk: 10, def: 5, spd: 10 } },
  { id: 'c-jelly-1', name: '灼熱クラゲ', attribute: 'fire', row: 'front', stats: { hp: 24, atk: 9, def: 3, spd: 9 } },
];

const TIDECAVE_GROUP = [
  { id: 'c-rockcrab-1', name: '岩ガニ', attribute: 'water', row: 'front', stats: { hp: 40, atk: 8, def: 10, spd: 4 } },
  { id: 'c-wisp-1', name: '満潮の悪霊', attribute: 'water', row: 'back', stats: { hp: 26, atk: 9, def: 6, spd: 8 } },
];

const COVE_BOSS_GROUP = [
  { id: 'c-boss-1', name: '深淵の海竜プロフンドラ', attribute: 'water', row: 'front', stats: { hp: 66, atk: 13, def: 10, spd: 9 } },
  { id: 'c-boss-add', name: '小海竜', attribute: 'water', row: 'back', stats: { hp: 26, atk: 7, def: 6, spd: 7 } },
];

export const COVE_MAP = {
  id: 'cove',
  name: '水辺の入江',
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '波打ち際',
      enemyGroup: SHORE_GROUP, xpReward: 28, goldReward: 20,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '流木の宝箱',
      reward: { stones: { attribute: 'water', amount: 6 }, gold: 15 },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '激流のほとり(遠回り)',
      enemyGroup: RIPTIDE_GROUP, xpReward: 45, goldReward: 32,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '砂に埋もれた祠',
      reward: { stones: { attribute: 'fire', amount: 6 }, gold: 20 },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '潮だまりの洞穴',
      enemyGroup: TIDECAVE_GROUP, xpReward: 55, goldReward: 40,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '深淵の主',
      enemyGroup: COVE_BOSS_GROUP, xpReward: 110, goldReward: 80,
      next: [],
    },
  },
};
