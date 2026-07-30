/* ============================================================
   highlandsMap.js
   マップ4: 霧の丘陵(溶岩の洞穴よりさらに強め)
   ============================================================ */

const MIST_PATH_GROUP = [
  { id: 'h-wolf-1', name: '霧狼', attribute: 'forest', row: 'front', stats: { hp: 34, atk: 10, def: 6, spd: 10 } },
  { id: 'h-wolf-2', name: '霧狼', attribute: 'forest', row: 'front', stats: { hp: 34, atk: 10, def: 6, spd: 10 } },
];

const STORM_GROUP = [
  { id: 'h-cloud-1', name: '雷雲の主', attribute: 'water', row: 'front', stats: { hp: 36, atk: 12, def: 7, spd: 9 } },
  { id: 'h-thorn-1', name: '茨の番人', attribute: 'forest', row: 'front', stats: { hp: 40, atk: 9, def: 11, spd: 6 } },
];

const BOULDER_GROUP = [
  { id: 'h-guardian-1', name: '巨岩の守護者', attribute: 'forest', row: 'front', stats: { hp: 50, atk: 11, def: 14, spd: 5 } },
  { id: 'h-bat-1', name: '稲妻蝙蝠', attribute: 'water', row: 'back', stats: { hp: 26, atk: 13, def: 5, spd: 13 } },
];

const HIGHLANDS_BOSS_GROUP = [
  { id: 'h-boss-1', name: '霧の女王ミストレディア', attribute: 'forest', row: 'front', stats: { hp: 86, atk: 16, def: 12, spd: 10 } },
  { id: 'h-boss-add', name: '影狼', attribute: 'forest', row: 'back', stats: { hp: 32, atk: 10, def: 8, spd: 11 } },
];

export const HIGHLANDS_MAP = {
  id: 'highlands',
  name: '霧の丘陵',
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '霧に沈む小道',
      enemyGroup: MIST_PATH_GROUP, xpReward: 42, goldReward: 30,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '苔生した宝箱',
      reward: { stones: { attribute: 'forest', amount: 8 }, gold: 28 },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '雷鳴の尾根(遠回り)',
      enemyGroup: STORM_GROUP, xpReward: 65, goldReward: 48,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '霧に隠れた祠',
      reward: { stones: { attribute: 'water', amount: 8 }, gold: 32 },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '巨石の広場',
      enemyGroup: BOULDER_GROUP, xpReward: 82, goldReward: 60,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '霧の女王',
      enemyGroup: HIGHLANDS_BOSS_GROUP, xpReward: 170, goldReward: 125,
      next: [],
    },
  },
};
