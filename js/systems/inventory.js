/* ============================================================
   inventory.js
   所持アイテム管理(属性石・専用アイテム)

   ※ 属性石は入手手段(探索・報酬など)が未実装のため、動作検証用に
     初期所持数を多めに設定している。専用アイテム(異姿化用など)は
     「特定のアイテムを使わないと異姿化できない」仕様に沿い、
     初期所持は0個とし、探索の報酬などを通じて入手する形にする。
   ============================================================ */

export class Inventory {
  constructor() {
    this.stones = { fire: 20, water: 20, forest: 20 };
    this.items = {}; // itemId -> 所持数
    this.gold = 50; // 検証用の初期所持金(仮)
  }

  hasGold(amount) {
    return this.gold >= amount;
  }

  addGold(amount) {
    this.gold += amount;
  }

  spendGold(amount) {
    if (!this.hasGold(amount)) return false;
    this.gold -= amount;
    return true;
  }

  hasStones(attribute, amount) {
    return (this.stones[attribute] ?? 0) >= amount;
  }

  addStones(attribute, amount) {
    this.stones[attribute] = (this.stones[attribute] ?? 0) + amount;
  }

  consumeStones(attribute, amount) {
    if (!this.hasStones(attribute, amount)) return false;
    this.stones[attribute] -= amount;
    return true;
  }

  hasItem(itemId, amount = 1) {
    return (this.items[itemId] ?? 0) >= amount;
  }

  addItem(itemId, amount = 1) {
    this.items[itemId] = (this.items[itemId] ?? 0) + amount;
  }

  consumeItem(itemId, amount = 1) {
    if (!this.hasItem(itemId, amount)) return false;
    this.items[itemId] -= amount;
    return true;
  }
}
