/* ============================================================
   constants.js
   属性・レア度など、ゲーム全体で使う定数定義
   ============================================================ */

export const ATTRIBUTES = {
  fire:    { id: 'fire',    label: '炎', badgeClass: 'attr-badge--fire',    color: '#e2503a', stoneName: '紅炎石' },
  water:   { id: 'water',   label: '水', badgeClass: 'attr-badge--water',   color: '#3d95c9', stoneName: '蒼水石' },
  forest:  { id: 'forest',  label: '森', badgeClass: 'attr-badge--forest',  color: '#4f9b52', stoneName: '翠森石' },
  thunder: { id: 'thunder', label: '雷', badgeClass: 'attr-badge--thunder', color: '#d9c72e', stoneName: '雷鳴石' },
  ice:     { id: 'ice',     label: '氷', badgeClass: 'attr-badge--ice',     color: '#8fd8e8', stoneName: '氷晶石' },
  earth:   { id: 'earth',   label: '地', badgeClass: 'attr-badge--earth',   color: '#8a6a42', stoneName: '大地石' },
  wind:    { id: 'wind',    label: '風', badgeClass: 'attr-badge--wind',    color: '#7fcbb0', stoneName: '疾風石' },
  light:   { id: 'light',   label: '光', badgeClass: 'attr-badge--light',   color: '#f2e9c9', stoneName: '聖輝石' },
  dark:    { id: 'dark',    label: '闇', badgeClass: 'attr-badge--dark',    color: '#6b4a8a', stoneName: '冥闇石' },
  void:    { id: 'void',    label: '無', badgeClass: 'attr-badge--void',    color: '#b8b0c8', stoneName: '原初石' },
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
