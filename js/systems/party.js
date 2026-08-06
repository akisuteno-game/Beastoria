/* ============================================================
   party.js
   パーティ編成システム

   仕様: パーティは最大4体、各メンバーは前衛(front) / 後衛(back)の
   いずれかに配置される。編成の組み方自体に制約は設けず
   (例: 前衛4体・後衛0体でも可)、バランス調整は今後の対戦データを
   見ながら別途行う想定。
   ============================================================ */

export const MAX_PARTY_SIZE = 4;

export class Party {
  constructor() {
    /** @type {{monster: object, row: 'front'|'back'}[]} */
    this.members = [];
  }

  isFull() {
    return this.members.length >= MAX_PARTY_SIZE;
  }

  addMember(monster, row = 'front') {
    if (this.isFull()) {
      throw new Error('パーティは最大4体までです');
    }
    this.members.push({ monster, row });
  }

  removeMember(instanceId) {
    this.members = this.members.filter(
      (m) => m.monster.instanceId !== instanceId
    );
  }

  toggleRow(instanceId) {
    const member = this.members.find(
      (m) => m.monster.instanceId === instanceId
    );
    if (member) {
      member.row = member.row === 'front' ? 'back' : 'front';
    }
  }

  get frontRow() {
    return this.members.filter((m) => m.row === 'front');
  }

  get backRow() {
    return this.members.filter((m) => m.row === 'back');
  }
}
