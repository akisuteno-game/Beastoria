/* ============================================================
   battle.js
   バトルシステム本体

   ルール:
   - 敵グループの前衛が残っている間は後衛を狙えない(味方側も同様に扱う)
   - ターンは素早さ(spd)順のラウンド制
   - 獣魂技はゲージ(gaugeMax到達)で発動可能になり、プレイヤーが
     任意のタイミングでボタン操作により発動する(ターン待ちしない
     ボーナス行動として扱う)
   ============================================================ */

import { getMultiElementalMultiplier } from '../data/elements.js';

const GAUGE_PER_ACTION = 30;

// 前衛/後衛の役割をはっきりさせるための補正。
// 前衛: 火力は高いが、そのぶんダメージも受けやすい(攻めの配置)
// 後衛: 火力は控えめだが、受けるダメージも抑えられる(守りの配置)
const ROW_ATTACK_MULT = { front: 1.15, back: 0.85 };
const ROW_DEFENSE_MULT = { front: 1.0, back: 0.8 };

// 属性相性のログ表記(既存の有名タイトルの言い回しと被らないよう、
// ビーストリア独自の表現にしている)
function elementalSuffix(mult) {
  if (mult >= 2) return '(属性の連鎖が炸裂!)';
  if (mult > 1) return '(属性の相性が噛み合った!)';
  return '';
}

export class Battle {
  constructor(allyUnits, enemyUnits) {
    this.allies = allyUnits;
    this.enemies = enemyUnits;
    this.log = [];
    this.status = 'ongoing'; // 'ongoing' | 'win' | 'lose'
    this.queue = [];
    this._buildQueue();
  }

  get allUnits() {
    return [...this.allies, ...this.enemies];
  }

  _buildQueue() {
    this.queue = this.allUnits
      .filter((u) => u.alive)
      .sort((a, b) => b.spd - a.spd)
      .map((u) => u.unitId);
  }

  _pushLog(message) {
    this.log.push(message);
  }

  // 対象側の「狙える」ユニット一覧(前衛が生きていれば前衛のみ)
  getValidTargets(side) {
    const pool = (side === 'ally' ? this.allies : this.enemies).filter((u) => u.alive);
    const front = pool.filter((u) => u.row === 'front');
    return front.length > 0 ? front : pool;
  }

  _pickTarget(side) {
    const targets = this.getValidTargets(side);
    if (targets.length === 0) return null;
    return targets.reduce((lowest, u) => (u.hp < lowest.hp ? u : lowest), targets[0]);
  }

  _applyDamage(attacker, target, multiplierBonus = 1) {
    const elementMult = getMultiElementalMultiplier(attacker.attributes, target.attributes);
    const rowAtkMult = ROW_ATTACK_MULT[attacker.row] ?? 1;
    const rowDefMult = ROW_DEFENSE_MULT[target.row] ?? 1;
    const raw = attacker.atk * rowAtkMult * elementMult * multiplierBonus * rowDefMult - target.def * 0.4;
    const dmg = Math.max(1, Math.round(raw));
    target.hp = Math.max(0, target.hp - dmg);
    if (target.hp === 0) {
      target.alive = false;
    }
    return { dmg, elementMult };
  }

  // 通常行動(自動): 有効な対象の中からHPが低い相手を狙う
  _performAutoAction(unit) {
    const opposingSide = unit.side === 'ally' ? 'enemy' : 'ally';
    const target = this._pickTarget(opposingSide);
    if (!target) return;

    const { dmg, elementMult } = this._applyDamage(unit, target);
    this._pushLog(`${unit.name} の攻撃! ${target.name} に ${dmg} ダメージ ${elementalSuffix(elementMult)}`);

    if (unit.side === 'ally') {
      unit.gauge = Math.min(unit.gaugeMax, unit.gauge + GAUGE_PER_ACTION);
    }
    if (!target.alive) {
      this._pushLog(`${target.name} を倒した！`);
    }
  }

  // キューの先頭ユニットに1行動させる。呼び出し側が一定間隔で呼ぶ想定。
  advance() {
    if (this.status !== 'ongoing') return;

    if (this.queue.length === 0) {
      this._buildQueue();
      if (this.queue.length === 0) return;
    }

    const unitId = this.queue.shift();
    const unit = this.allUnits.find((u) => u.unitId === unitId);
    if (!unit || !unit.alive) {
      this._checkEnd();
      return;
    }

    this._performAutoAction(unit);
    this._checkEnd();
  }

  // プレイヤーが「獣魂技」ボタンを押した時に呼ぶボーナス行動
  useSpecial(unitId) {
    if (this.status !== 'ongoing') return false;
    const unit = this.allies.find((u) => u.unitId === unitId);
    if (!unit || !unit.alive || unit.gauge < unit.gaugeMax) return false;

    const target = this._pickTarget('enemy');
    if (!target) return false;

    const { dmg, elementMult } = this._applyDamage(unit, target, unit.specialMultiplier ?? 1.8);
    const moveName = unit.specialName ?? '獣魂技';
    this._pushLog(`★ ${unit.name} の「${moveName}」が炸裂！ ${target.name} に ${dmg} ダメージ ${elementalSuffix(elementMult)}`);
    unit.gauge = 0;
    if (!target.alive) {
      this._pushLog(`${target.name} を倒した！`);
    }

    this._checkEnd();
    return true;
  }

  _checkEnd() {
    if (this.enemies.every((u) => !u.alive)) {
      this.status = 'win';
      this._pushLog('すべての敵を倒した！ 勝利！');
    } else if (this.allies.every((u) => !u.alive)) {
      this.status = 'lose';
      this._pushLog('パーティは全滅してしまった…');
    }
  }
}
