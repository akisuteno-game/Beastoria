/* ============================================================
   shop.js
   商店データ

   ※ 属性石のみ販売する。異姿化専用アイテムは「特定の状況で見つける
     特別なもの」という位置づけを保つため、あえて商店では売らず、
     探索の報酬のみで入手できるようにしている。
   ============================================================ */

export const STONE_PRICE = 5; // 属性石1個あたりの価格(仮)
export const STONE_PURCHASE_AMOUNT = 5; // 1回の購入で得られる個数

export const SHOP_STONE_LIST = [
  { attribute: 'fire', label: '炎属性石' },
  { attribute: 'water', label: '水属性石' },
  { attribute: 'forest', label: '森属性石' },
];
