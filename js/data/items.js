/* ============================================================
   items.js
   異姿化専用アイテム

   異姿化は「特定のアイテムを使わないと起こらない」仕様のため、
   進化用の属性石とは別に、種族ごとの専用アイテムを用意する。
   通常の探索報酬などから入手する想定(現状はファングルの分のみ
   デモとして探索マップの宝箱に割り当てている)。
   ============================================================ */

export const TRANSFORMATION_ITEMS = {
  fangle: { id: 'ember-shard', name: '燃え残りの火種' },
  mizmol: { id: 'tide-pearl', name: '満ち潮の真珠' },
  leafy: { id: 'moon-leaf', name: '月影の葉' },
  kokerin: { id: 'starlit-acorn', name: '星影のどんぐり' },
  shizuku: { id: 'abyssal-shell', name: '深淵の貝殻' },
  pachitto: { id: 'spark-core', name: '火花の核' },
};

export function getTransformationItem(speciesId) {
  return TRANSFORMATION_ITEMS[speciesId] ?? null;
}
