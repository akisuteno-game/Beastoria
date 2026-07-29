/* ============================================================
   constants.js
   属性・レア度など、ゲーム全体で使う定数定義
   ============================================================ */

export const ATTRIBUTES = {
  fire:   { id: 'fire',   label: '炎', badgeClass: 'attr-badge--fire',   color: '#e2503a' },
  water:  { id: 'water',  label: '水', badgeClass: 'attr-badge--water',  color: '#3d95c9' },
  forest: { id: 'forest', label: '森', badgeClass: 'attr-badge--forest', color: '#4f9b52' },
};

// レア度10段階: ★を基本とし、上位帯は✦で表現する
// (例: ★1〜★5、★5✦1〜★5✦5 のような段階表現を想定。
//  正式な閾値は今後のバランス調整フェーズで確定する)
export function rarityToStars(rarityLevel) {
  const clamped = Math.max(1, Math.min(10, rarityLevel));
  if (clamped <= 5) {
    return '★'.repeat(clamped);
  }
  return '★★★★★' + '✦'.repeat(clamped - 5);
}

export const ROLE_LABEL = {
  attack:  '攻撃型',
  defense: '耐久回復型',
  support: '支援型',
};
