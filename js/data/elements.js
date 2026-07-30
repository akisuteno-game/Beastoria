/* ============================================================
   elements.js
   属性相性システム

   炎→森→水→炎 の三すくみ。直感的にわかりやすい設計方針に沿い、
   「何が何に強いか」を1つのテーブルだけで表現する。
   有利: 1.5倍 / 不利: 0.7倍 / それ以外: 等倍
   ============================================================ */

// key(攻撃側の属性) が強い相手の属性
const ADVANTAGE_OVER = {
  fire: 'forest',
  forest: 'water',
  water: 'fire',
};

export function getElementalMultiplier(attackerAttr, defenderAttr) {
  if (attackerAttr === defenderAttr) return 1;
  if (ADVANTAGE_OVER[attackerAttr] === defenderAttr) return 1.5;
  if (ADVANTAGE_OVER[defenderAttr] === attackerAttr) return 0.7;
  return 1;
}
