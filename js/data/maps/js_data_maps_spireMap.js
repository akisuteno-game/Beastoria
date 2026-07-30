/* ============================================================
   spireMap.js
   マップ5: 氷結の尖塔(最難関)
   ============================================================ */

const FROSTPATH_GROUP = [
  { id: 's-wolf-1', name: '氷牙狼', attribute: 'water', row: 'front', stats: { hp: 40, atk: 12, def: 8, spd: 11 } },
  { id: 's-wolf-2', name: '氷牙狼', attribute: 'water', row: 'front', stats: { hp: 40, atk: 12, def: 8, spd: 11 } },
];

const WRAITH_GROUP = [
  { id: 's-wraith-1', name: '凍てつく亡霊', attribute: 'water', row: 'front', stats: { hp: 38, atk: 14, def: 8, spd: 10 } },
  { id: 's-guard-1', name: '氷炎の番人', attribute: 'fire', row: 'front', stats: { hp: 42, atk: 13, def: 9, spd: 9 } },
];

const GOLEM_GROUP = [
  { id: 's-golem-1', name: '氷結ゴーレム', attribute: 'water', row: 'front', stats: { hp: 58, atk: 12, def: 16, spd: 5 } },
  { id: 's-blizzard-1', name: '吹雪の精', attribute: 'water', row: 'back', stats: { hp: 30, atk: 15, def: 6, spd: 13 } },
];

const SPIRE_BOSS_GROUP = [
  { id: 's-boss-1', name: '氷帝グラキエスレクス', attribute: 'water', row: 'front', stats: { hp: 100, atk: 19, def: 14, spd: 10 } },
  { id: 's-boss-add-1', name: '氷晶の従者', attribute: 'water', row: 'back', stats: { hp: 40, atk: 10, def: 10, spd: 8 } },
  { id: 's-boss-add-2', name: '氷晶の従者', attribute: 'water', row: 'back', stats: { hp: 40, atk: 10, def: 10, spd: 8 } },
];

export const SPIRE_MAP = {
  id: 'spire',
  name: '氷結の尖塔',
  startId: 'n1',
  nodes: {
    n1: {
      id: 'n1', type: 'battle', label: '凍る回廊',
      enemyGroup: FROSTPATH_GROUP, xpReward: 50, goldReward: 35,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '氷漬けの宝箱',
      reward: { stones: { attribute: 'water', amount: 9 }, gold: 35 },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '亡霊の間(遠回り)',
      enemyGroup: WRAITH_GROUP, xpReward: 78, goldReward: 58,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '尖塔中腹の祠',
      reward: { stones: { attribute: 'fire', amount: 9 }, gold: 40 },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '氷像の間',
      enemyGroup: GOLEM_GROUP, xpReward: 98, goldReward: 72,
      next: ['n5'],
    },
    n5: {
      id: 'n5', type: 'boss', label: '氷帝の玉座',
      enemyGroup: SPIRE_BOSS_GROUP, xpReward: 210, goldReward: 150,
      next: [],
    },
  },
};
