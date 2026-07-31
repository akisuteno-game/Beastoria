/* ============================================================
   eggMonsters.js
   タマゴから生まれるモンスター(スターター以外)

   スターター(炎/水/森)とは別の属性を持たせている。
   スターターと同じ形のデータ(species)。孵化のたびに
   createMonsterInstanceへ渡してインスタンス化する。
   ============================================================ */

export const EGG_MONSTERS = [
  {
    id: 'kokerin',
    name: 'コケリン',
    attribute: 'wind',
    role: 'support',
    rarity: 1,
    baseStats: { hp: 34, atk: 7, def: 9, spd: 11 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
  {
    id: 'shizuku',
    name: 'シズック',
    attribute: 'earth',
    role: 'defense',
    rarity: 1,
    baseStats: { hp: 44, atk: 8, def: 13, spd: 7 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
  {
    id: 'pachitto',
    name: 'パチット',
    attribute: 'thunder',
    role: 'attack',
    rarity: 1,
    baseStats: { hp: 30, atk: 13, def: 6, spd: 10 },
    evolution: { stage: 1, maxStage: 3, stoneCost: 20 },
  },
];
