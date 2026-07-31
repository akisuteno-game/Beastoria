/* ============================================================
   cavernMap.js
   マップ3: 溶岩の洞穴(水辺の入江よりさらに強め)
   ============================================================ */

const LAVA_PATH_GROUP = [
  { id: 'v-lizard-1', name: '溶岩トカゲ', attribute: 'fire', row: 'front', stats: { hp: 28, atk: 8, def: 5, spd: 8 } },
  { id: 'v-lizard-2', name: '溶岩トカゲ', attribute: 'fire', row: 'front', stats: { hp: 28, atk: 8, def: 5, spd: 8 } },
];

const EMBER_GROUP = [
  { id: 'v-bat-1', name: '灼熱コウモリ', attribute: 'fire', row: 'front', stats: { hp: 22, atk: 11, def: 4, spd: 12 } },
  { id: 'v-spirit-1', name: '熱波の精', attribute: 'fire', row: 'back', stats: { hp: 30, atk: 9, def: 6, spd: 7 } },
];

const GOLEM_GROUP = [
  { id: 'v-golem-1', name: '岩石ゴーレム', attribute: 'forest', row: 'front', stats: { hp: 42, atk: 8, def: 13, spd: 3 } },
  { id: 'v-imp-1', name: '溶岩インプ', attribute: 'fire', row: 'back', stats: { hp: 20, atk: 10, def: 4, spd: 11 } },
];

const CAVERN_BOSS_GROUP = [
  { id: 'v-boss-1', name: '灼熱の王グランマグマ', attribute: 'fire', row: 'front', stats: { hp: 78, atk: 15, def: 11, spd: 8 } },
  { id: 'v-boss-add', name: '溶岩の眷属', attribute: 'fire', row: 'back', stats: { hp: 28, atk: 8, def: 7, spd: 7 } },
];

export const CAVERN_MAP = {
  id: 'cavern',
  name: '溶岩の洞穴',
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '灼熱の入り口',
      enemyGroup: LAVA_PATH_GROUP, xpReward: 35, goldReward: 25,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '焼け残った宝箱',
      reward: { stones: { attribute: 'fire', amount: 7 }, gold: 20 },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '噴煙の回廊(遠回り)',
      enemyGroup: EMBER_GROUP, xpReward: 55, goldReward: 40,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '溶岩に沈んだ祠',
      reward: { stones: { attribute: 'water', amount: 7 }, gold: 25 },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '巨像の間',
      enemyGroup: GOLEM_GROUP, xpReward: 68, goldReward: 50,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '灼熱の王',
      enemyGroup: CAVERN_BOSS_GROUP, xpReward: 140, goldReward: 100,
      next: [],
    },
  },
};
