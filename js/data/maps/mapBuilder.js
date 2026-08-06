/* ============================================================
   mapBuilder.js
   マップ生成の共通処理

   全マップ共通の12ノード構成(戦闘8・宝箱4、分岐2回)を、
   テーマ設定(出現種族・レベル帯・報酬属性)だけで組み立てる。
   1マップごとに敵データを手打ちする代わりに、ここで
   wildEncounter.jsのレベル計算を使って自動生成する。

   ノード構成:
   n1(入口) → [n2a(宝箱) / n2b(険しい道)] → n3(合流の祠)
     → n4(戦闘) → [n5a(精鋭の道) / n5b(隠し宝箱)] → n6(合流の祠)
     → n7(戦闘) → n8(戦闘) → n9(前線の戦い) → n10(ボスの間)
   ============================================================ */

import { wildGroup } from '../../systems/wildEncounter.js';

export function buildMap({
  id,
  name,
  primarySpecies,   // 通常ルートで出現する種族id配列
  altSpecies,       // 分岐の険しい道・精鋭ルートで出現する種族id配列
  bossSpecies,      // ボス本体の種族id
  bossAddSpecies,   // ボスの随伴(無ければnull)
  levelBase,        // n1の敵レベル
  treasureAttrs,    // [n2a, n3, n5b, n6]の宝箱で得られる属性石の属性(4つ)
  goldBase = 15,
}) {
  const lv = (offset) => levelBase + offset;
  const pick = (pool, i) => pool[i % pool.length];

  const nodes = {
    n1: {
      id: 'n1', type: 'battle', label: '入口の守り',
      enemyGroup: wildGroup([
        { speciesId: pick(primarySpecies, 0), level: lv(0), row: 'front' },
        { speciesId: pick(primarySpecies, 1), level: lv(0), row: 'front' },
      ]),
      xpReward: 20 + levelBase * 2, goldReward: goldBase,
      next: ['n2a', 'n2b'],
    },
    n2a: {
      id: 'n2a', type: 'treasure', label: '近道の宝箱',
      reward: { stones: { attribute: treasureAttrs[0], amount: 5 }, gold: goldBase },
      next: ['n3'],
    },
    n2b: {
      id: 'n2b', type: 'battle', label: '険しい道(遠回り)',
      enemyGroup: wildGroup([
        { speciesId: pick(altSpecies, 0), level: lv(2), row: 'front' },
        { speciesId: pick(primarySpecies, 2), level: lv(1), row: 'front' },
      ]),
      xpReward: 32 + levelBase * 2, goldReward: goldBase + 10,
      next: ['n3'],
    },
    n3: {
      id: 'n3', type: 'treasure', label: '合流の祠',
      reward: { stones: { attribute: treasureAttrs[1], amount: 6 }, gold: goldBase + 5 },
      next: ['n4'],
    },
    n4: {
      id: 'n4', type: 'battle', label: '奥へ続く道',
      enemyGroup: wildGroup([
        { speciesId: pick(primarySpecies, 1), level: lv(3), row: 'front' },
        { speciesId: pick(altSpecies, 1), level: lv(2), row: 'back' },
      ]),
      xpReward: 40 + levelBase * 2, goldReward: goldBase + 15,
      next: ['n5a', 'n5b'],
    },
    n5a: {
      id: 'n5a', type: 'battle', label: '精鋭の道(遠回り)',
      enemyGroup: wildGroup([
        { speciesId: pick(altSpecies, 0), level: lv(5), row: 'front' },
        { speciesId: pick(altSpecies, 1), level: lv(4), row: 'front' },
      ]),
      xpReward: 55 + levelBase * 2, goldReward: goldBase + 25,
      next: ['n6'],
    },
    n5b: {
      id: 'n5b', type: 'treasure', label: '隠された宝箱',
      reward: { stones: { attribute: treasureAttrs[2], amount: 7 }, gold: goldBase + 15 },
      next: ['n6'],
    },
    n6: {
      id: 'n6', type: 'treasure', label: '二度目の合流の祠',
      reward: { stones: { attribute: treasureAttrs[3], amount: 8 }, gold: goldBase + 20 },
      next: ['n7'],
    },
    n7: {
      id: 'n7', type: 'battle', label: '前線への道',
      enemyGroup: wildGroup([
        { speciesId: pick(primarySpecies, 0), level: lv(4), row: 'front' },
        { speciesId: pick(altSpecies, 0), level: lv(4), row: 'back' },
      ]),
      xpReward: 50 + levelBase * 2, goldReward: goldBase + 20,
      next: ['n8'],
    },
    n8: {
      id: 'n8', type: 'battle', label: '追い詰められた道',
      enemyGroup: wildGroup([
        { speciesId: pick(altSpecies, 1), level: lv(6), row: 'front' },
        { speciesId: pick(primarySpecies, 2), level: lv(5), row: 'front' },
      ]),
      xpReward: 65 + levelBase * 2, goldReward: goldBase + 30,
      next: ['n9'],
    },
    n9: {
      id: 'n9', type: 'battle', label: '前線の戦い',
      enemyGroup: wildGroup([
        { speciesId: pick(altSpecies, 0), level: lv(7), row: 'front' },
        { speciesId: pick(altSpecies, 1), level: lv(7), row: 'front' },
        { speciesId: pick(primarySpecies, 1), level: lv(6), row: 'back' },
      ]),
      xpReward: 80 + levelBase * 2, goldReward: goldBase + 40,
      next: ['n10'],
    },
    n10: {
      id: 'n10', type: 'boss', label: 'ボスの間',
      enemyGroup: bossAddSpecies
        ? wildGroup([
            { speciesId: bossSpecies, level: lv(5), row: 'front', bossMult: 1.2 },
            { speciesId: bossAddSpecies, level: lv(3), row: 'back' },
          ])
        : wildGroup([
            { speciesId: bossSpecies, level: lv(5), row: 'front', bossMult: 1.3 },
          ]),
      xpReward: 150 + levelBase * 3, goldReward: goldBase + 80,
      next: [],
    },
  };

  return { id, name, startId: 'n1', nodes };
}
