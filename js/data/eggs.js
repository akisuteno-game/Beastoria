/* ============================================================
   eggs.js
   タマゴデータ

   タマゴを使うと、poolの中から重み付き抽選で1体生まれる。
   現時点では基本タマゴ1種類のみ(EGG_MONSTERS全体が対象)。
   将来的に属性限定タマゴなどを追加する余地を残している。
   ============================================================ */

export const BASIC_EGG = {
  id: 'basic-egg',
  name: 'ふつうのタマゴ',
  price: 40, // 商店での購入価格(ゴールド)
  pool: [
    { speciesId: 'kokerin', weight: 1 },
    { speciesId: 'shizuku', weight: 1 },
    { speciesId: 'pachitto', weight: 1 },
  ],
};
