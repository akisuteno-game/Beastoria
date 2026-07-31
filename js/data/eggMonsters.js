/* ============================================================
   eggMonsters.js
   タマゴから生まれるモンスター(スターター以外)

   スターターと同じ形のデータ(species)。孵化のたびに
   createMonsterInstanceへ渡してインスタンス化する。
   ============================================================ */

export const EGG_MONSTERS = [
  {
    id: 'kokerin',
    name: 'コケリン',
    attribute: 'forest',
    role: 'support',
    rarity: 2,
    baseStats: { hp: 34, atk: 7, def: 9, spd: 11 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
  {
    id: 'shizuku',
    name: 'シズック',
    attribute: 'water',
    role: 'defense',
    rarity: 2,
    baseStats: { hp: 44, atk: 8, def: 13, spd: 7 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
  {
    id: 'pachitto',
    name: 'パチット',
    attribute: 'fire',
    role: 'attack',
    rarity: 2,
    baseStats: { hp: 30, atk: 13, def: 6, spd: 10 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
];
