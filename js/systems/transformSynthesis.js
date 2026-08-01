/* ============================================================
   transformSynthesis.js
   異姿化合成システム

   仕様:
   - 倒したモンスターがドロップする「結晶」(属性ごと)を、
     所持モンスターに合成することで異姿化させる。
   - 対象モンスターがまだ持っていない属性の結晶を使うと、
     新しい属性を獲得する(=異姿化のカウントを1つ消費)。
       - 1回目の合成: 元の属性を新しい属性に置き換える
       - 2回目以降: 属性を追加する(複合属性化)
     異姿化できる回数は種族ごとに決まっている(0〜3回、maxTransform)。
   - 対象モンスターが既に持っている属性の結晶を使うと、
     属性は増えないが、ステータスと獣魂技の威力が強化される
     (reinforceCount、回数上限なし)。
   - 属性が増えるほど、その属性すべての有利・不利を引き継ぎ、
     ステータスにも追加のボーナスが乗る(statUtils.getTransformScalar)。
   ============================================================ */

import { recomputeStats } from './leveling.js';

export const REINFORCE_SPECIAL_BONUS = 0.1; // 同属性強化1回ごとの獣魂技威力ボーナス

export function canGainNewAttribute(instance) {
  return instance.transformCount < instance.maxTransform;
}

// 獣魂技の威力倍率(同属性強化で上昇する)
export function getSpecialMultiplier(instance) {
  return 1.8 + REINFORCE_SPECIAL_BONUS * instance.reinforceCount;
}

/**
 * 結晶をモンスターに合成する。
 * @param {object} instance 合成対象のモンスターインスタンス
 * @param {string} crystalAttribute 使用する結晶の属性
 * @param {object} inventory Inventoryインスタンス
 * @returns {{success:boolean, reason?:string, kind?:'new-attribute'|'reinforce'}}
 */
export function synthesizeCrystal(instance, crystalAttribute, inventory) {
  if (!inventory.hasCrystal(crystalAttribute, 1)) {
    return { success: false, reason: 'no-crystal' };
  }

  const alreadyHasAttribute = instance.attributes.includes(crystalAttribute);

  if (alreadyHasAttribute) {
    inventory.consumeCrystal(crystalAttribute, 1);
    instance.reinforceCount += 1;
    recomputeStats(instance);
    return { success: true, kind: 'reinforce' };
  }

  if (!canGainNewAttribute(instance)) {
    return { success: false, reason: 'transform-cap-reached' };
  }

  inventory.consumeCrystal(crystalAttribute, 1);

  if (instance.transformCount === 0) {
    // 初回: 元の属性を置き換える
    instance.attributes = [crystalAttribute];
  } else {
    // 2回目以降: 属性を追加(複合属性化)
    instance.attributes = [...instance.attributes, crystalAttribute];
  }
  instance.transformCount += 1;

  recomputeStats(instance);
  return { success: true, kind: 'new-attribute' };
}
