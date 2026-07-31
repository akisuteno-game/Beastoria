/* ============================================================
   shop.js
   商店データ

   ※ 属性石のみ販売する(全10属性)。異姿化専用アイテムは
     「特定の状況で見つける特別なもの」という位置づけを保つため、
     あえて商店では売らず、探索の報酬のみで入手できるようにしている。
   ============================================================ */

export const STONE_PRICE = 5; // 属性石1個あたりの価格(仮)
export const STONE_PURCHASE_AMOUNT = 5; // 1回の購入で得られる個数

// 属性の並び順(商店での表示順)。名称はconstants.jsのATTRIBUTESから取得する。
export const SHOP_STONE_ATTRIBUTES = [
  'fire', 'water', 'forest', 'thunder', 'ice',
  'earth', 'wind', 'light', 'dark', 'void',
];
