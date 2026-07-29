/* ============================================================
   battleUnit.js
   バトル中の実行時ステータス(HP・獣魂技ゲージなど)を持つ
   「ユニット」を、味方(所持モンスター)・敵(敵データ)の両方から
   共通の形で生成する。
   ============================================================ */

let _unitSeq = 0;

function baseUnit({ id, name, attribute, stats, side, row }) {
  _unitSeq += 1;
  return {
    unitId: `unit-${_unitSeq}`,
    sourceId: id,
    name,
    attribute,
    side,               // 'ally' | 'enemy'
    row,                // 'front' | 'back'
    maxHp: stats.hp,
    hp: stats.hp,
    atk: stats.atk,
    def: stats.def,
    spd: stats.spd,
    gauge: 0,
    gaugeMax: 100,
    alive: true,
  };
}

// パーティメンバー(所持モンスターのインスタンス)から味方ユニットを生成
export function createAllyUnit(partyMember) {
  const { monster, row } = partyMember;
  return baseUnit({
    id: monster.instanceId,
    name: monster.name,
    attribute: monster.attribute,
    stats: monster.stats,
    side: 'ally',
    row,
  });
}

// 敵データから敵ユニットを生成
export function createEnemyUnit(enemyData) {
  return baseUnit({
    id: enemyData.id,
    name: enemyData.name,
    attribute: enemyData.attribute,
    stats: enemyData.stats,
    side: 'enemy',
    row: enemyData.row,
  });
}
