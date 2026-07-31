/* ============================================================
   elements.js
   属性相性システム(10属性)

   炎→森→雷→氷→水→地→光→闇→風→無→炎 の一巡する相性の輪。
   3属性のときと同じ考え方(隣を1つ倒せる/1つに弱い)を維持したまま
   属性数だけ拡張した。
   有利: 1.5倍 / 不利: 0.7倍 / それ以外: 等倍
   ============================================================ */

const ADVANTAGE_CYCLE = [
  'fire', 'forest', 'thunder', 'ice', 'water',
  'earth', 'light', 'dark', 'wind', 'void',
];

// key(攻撃側の属性) が強い相手の属性
const ADVANTAGE_OVER = {};
ADVANTAGE_CYCLE.forEach((attr, i) => {
  const next = ADVANTAGE_CYCLE[(i + 1) % ADVANTAGE_CYCLE.length];
  ADVANTAGE_OVER[attr] = next;
});

export function getElementalMultiplier(attackerAttr, defenderAttr) {
  if (attackerAttr === defenderAttr) return 1;
  if (ADVANTAGE_OVER[attackerAttr] === defenderAttr) return 1.5;
  if (ADVANTAGE_OVER[defenderAttr] === attackerAttr) return 0.7;
  return 1;
}
