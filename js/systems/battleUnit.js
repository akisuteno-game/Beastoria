/* ============================================================
   battleUnit.js
   バトル中の実行時ステータス(HP・獣魂技ゲージなど)を持つ
   「ユニット」を、味方(所持モンスター)・敵(敵データ)の両方から
   共通の形で生成する。属性は常に配列(attributes)で統一する。
   ============================================================ */

import { getSpecialMultiplier } from './transformSynthesis.js';
import { getSpecialMove } from '../data/specialMoves.js';

let _unitSeq = 0;

function baseUnit({ id, name, attributes, stats, side, row, specialMultiplier, specialName, specialDescription }) {
  _unitSeq += 1;
  return {
    unitId: `unit-${_unitSeq}`,
    sourceId: id,
    name,
    attributes,          // string[] (通常は1つ、異姙化合成で複数になりうる)
    side,                // 'ally' | 'enemy'
    row,                 // 'front' | 'back'
    maxHp: stats.hp,
    hp: stats.hp,
    atk: stats.atk,
    def: stats.def,
    spd: stats.spd,
    gauge: 0,
    gaugeMax: 100,
    alive: true,
    specialMultiplier,    // 獣魂技の威力倍率(味方のみ意味を持つ)
    specialName,          // 獣魂技の名前
    specialDescription,   // 獣魂技の説明
  };
}

// パーティメンバー(所持モンスターのインスタンス)から味方ユニットを生成
export function createAllyUnit(partyMember) {
  const { monster, row } = partyMember;
  const move = getSpecialMove(monster.speciesId);
  return baseUnit({
    id: monster.instanceId,
    name: monster.name,
    attributes: monster.attributes,
    stats: monster.stats,
    side: 'ally',
    row,
    specialMultiplier: getSpecialMultiplier(monster),
    specialName: move.name,
    specialDescription: move.description,
  });
}

// 敵データから敵ユニットを生成
export function createEnemyUnit(enemyData) {
  return baseUnit({
    id: enemyData.id,
    name: enemyData.name,
    attributes: [enemyData.attribute],
    stats: enemyData.stats,
    side: 'enemy',
    row: enemyData.row,
    specialMultiplier: 1.8,
    specialName: '獣魂技',
    specialDescription: '',
  });
}
