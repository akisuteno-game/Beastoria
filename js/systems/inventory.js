/* ============================================================
   inventory.js
   所持アイテム管理(属性石・異姿結晶)

   ※ 入手手段(探索・報酬など)は未実装のため、動作検証用に
     初期所持数を多めに設定している。
   ============================================================ */

export class Inventory {
  constructor() {
    this.stones = { fire: 20, water: 20, forest: 20 };
    this.crystals = 10; // 異姿結晶(仮アイテム、属性を問わず共通)
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

  hasCrystals(amount) {
    return this.crystals >= amount;
  }

  addCrystals(amount) {
    this.crystals += amount;
  }

  consumeCrystals(amount) {
    if (!this.hasCrystals(amount)) return false;
    this.crystals -= amount;
    return true;
  }
}
