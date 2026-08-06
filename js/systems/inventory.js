/* ============================================================
   inventory.js
   所持アイテム管理(属性石・結晶・汎用アイテム・所持金)

   属性石(stones): 進化に使う。ショップで購入可能。
   結晶(crystals): 異姙化合成に使う。倒したモンスターがドロップする。
   items: タマゴなど、その他の汎用アイテム。
   ============================================================ */

export class Inventory {
  constructor() {
    this.stones = {
      fire: 20, water: 20, forest: 20, thunder: 20, ice: 20,
      earth: 20, wind: 20, light: 20, dark: 20, void: 20,
    };
    this.crystals = {}; // attribute -> 所持数(結晶。初期は未所持)
    this.items = {}; // itemId -> 所持数(タマゴなど)
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

  hasCrystal(attribute, amount = 1) {
    return (this.crystals[attribute] ?? 0) >= amount;
  }

  addCrystal(attribute, amount = 1) {
    this.crystals[attribute] = (this.crystals[attribute] ?? 0) + amount;
  }

  consumeCrystal(attribute, amount = 1) {
    if (!this.hasCrystal(attribute, amount)) return false;
    this.crystals[attribute] -= amount;
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
