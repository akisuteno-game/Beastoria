/* ============================================================
   elements.js
   属性相性システム(10属性・直感的な弱点関係)

   実際の自然現象に近い、感覚的にわかりやすい一方向の相性リスト。
   一律の輪ではなく、属性ごとに個別の弱点を定義している。

   - 炎は森に強い(燃やす)
   - 森は水に強い(吸い上げる)
   - 水は炎に強い(消し止める)
   - 炎は氷に強い(溶かす)
   - 氷は水に強い(凍らせる)
   - 雷は水に強い(感電させる)
   - 地は雷に強い(アースする)
   - 風は地に強い(削り飛ばす)
   - 森は風に強い(受け流す・根で耐える)
   - 光と闇は互いに弱点(相互に1.5倍)
   - 無はどの属性とも干渉しない(常に等倍)

   ここに無い組み合わせはすべて等倍(互角)。
   ============================================================ */

// [攻撃側, 防御側] … 攻撃側が1.5倍のダメージを与える一方向の関係
const ADVANTAGE_PAIRS = [
  ['fire', 'forest'],
  ['forest', 'water'],
  ['water', 'fire'],
  ['fire', 'ice'],
  ['ice', 'water'],
  ['thunder', 'water'],
  ['earth', 'thunder'],
  ['wind', 'earth'],
  ['forest', 'wind'],
];

const STRONG_MULT = 1.5;

export function getElementalMultiplier(attackerAttr, defenderAttr) {
  if (attackerAttr === defenderAttr) return 1;

  // 無属性はどちらの側にいても常に等倍
  if (attackerAttr === 'void' || defenderAttr === 'void') return 1;

  // 光と闇は相互に弱点(どちらから攻めても1.5倍)
  const isLightDarkPair =
    (attackerAttr === 'light' && defenderAttr === 'dark') ||
    (attackerAttr === 'dark' && defenderAttr === 'light');
  if (isLightDarkPair) return STRONG_MULT;

  const isAdvantage = ADVANTAGE_PAIRS.some(
    ([a, d]) => a === attackerAttr && d === defenderAttr
  );
  if (isAdvantage) return STRONG_MULT;

  return 1;
}

// 複合属性対応: 攻撃側・防御側とも属性の配列を受け取り、
// 全組み合わせの相性を掛け合わせる(異姿化合成で属性が増えると
// 「有利と不利が全部引き継がれる」仕様のため)。
export function getMultiElementalMultiplier(attackerAttrs, defenderAttrs) {
  let total = 1;
  attackerAttrs.forEach((a) => {
    defenderAttrs.forEach((d) => {
      total *= getElementalMultiplier(a, d);
    });
  });
  return total;
}

// デバッグ・確認用に相性ペア一覧を取り出せるようにしておく
export function getAdvantagePairs() {
  return ADVANTAGE_PAIRS;
}
