/* ============================================================
   roster.js
   所持モンスター管理

   パーティ(Party)は編成中の最大4体だけを扱うのに対し、Rosterは
   これまでに入手した全モンスターを保持する。同じインスタンス
   (オブジェクト参照)をPartyとRosterの両方が指す想定のため、
   進化・異姿化による変化はどちらから見ても反映される。
   ============================================================ */

export class Roster {
  constructor() {
    this.monsters = [];
  }

  addMonster(instance) {
    this.monsters.push(instance);
  }

  findById(instanceId) {
    return this.monsters.find((m) => m.instanceId === instanceId) ?? null;
  }

  get list() {
    return this.monsters;
  }
}
