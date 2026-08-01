/* ============================================================
   attrBadges.js
   複合属性(異姙化合成で増える)に対応した属性バッジの共通描画
   ============================================================ */

import { ATTRIBUTES } from '../data/constants.js';

// instance.attributes(string[])から属性バッジのHTMLを組み立てる
export function renderAttrBadgesHtml(attributeIds) {
  return attributeIds
    .map((id) => {
      const attr = ATTRIBUTES[id];
      return `<span class="attr-badge ${attr.badgeClass}">${attr.label}</span>`;
    })
    .join(' ');
}

// スプライトの色は先頭(主属性)の色を使う
export function primaryAttrColor(attributeIds) {
  return ATTRIBUTES[attributeIds[0]].color;
}
