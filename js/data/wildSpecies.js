/* ============================================================
   wildSpecies.js
   野生モンスター(敵専用)の種族データ

   プレイヤーが仲間にするモンスター(スターター・タマゴ)と表記を
   統一し、カタカナ表記にしている。タマゴから生まれてくる存在と
   いう設定は同じで、内部的にも同じ「種族データ→レベルに応じた
   ステータス計算」という仕組みを利用している(wildEncounter.js参照)。

   baseStats はレベル1時点の値。
   ============================================================ */

export const WILD_SPECIES = {
  // 炎
  hibana:   { id: 'hibana',   name: 'ヒバナ',     attribute: 'fire',    role: 'attack',  baseStats: { hp: 18, atk: 7, def: 3, spd: 8 } },
  meramera: { id: 'meramera', name: 'メラメラ',   attribute: 'fire',    role: 'attack',  baseStats: { hp: 22, atk: 8, def: 4, spd: 7 } },
  // 水
  shizukun: { id: 'shizukun', name: 'シズクン',   attribute: 'water',   role: 'defense', baseStats: { hp: 24, atk: 6, def: 7, spd: 6 } },
  mizuumi:  { id: 'mizuumi',  name: 'ミズウミ',   attribute: 'water',   role: 'defense', baseStats: { hp: 28, atk: 6, def: 8, spd: 5 } },
  // 森
  kokekko:  { id: 'kokekko',  name: 'コケッコ',   attribute: 'forest',  role: 'support', baseStats: { hp: 20, atk: 6, def: 5, spd: 8 } },
  happan:   { id: 'happan',   name: 'ハッパン',   attribute: 'forest',  role: 'support', baseStats: { hp: 22, atk: 7, def: 6, spd: 7 } },
  // 雷
  ikazuchi: { id: 'ikazuchi', name: 'イカヅチ',   attribute: 'thunder', role: 'attack',  baseStats: { hp: 18, atk: 9, def: 3, spd: 10 } },
  biribiri: { id: 'biribiri', name: 'ビリビリ',   attribute: 'thunder', role: 'attack',  baseStats: { hp: 16, atk: 8, def: 2, spd: 12 } },
  // 氷
  koorin:   { id: 'koorin',   name: 'コオリン',   attribute: 'ice',     role: 'defense', baseStats: { hp: 24, atk: 7, def: 8, spd: 5 } },
  tsurataran: { id: 'tsurataran', name: 'ツララン', attribute: 'ice',   role: 'attack',  baseStats: { hp: 20, atk: 9, def: 5, spd: 7 } },
  // 地
  tsuchinko: { id: 'tsuchinko', name: 'ツチンコ',  attribute: 'earth',  role: 'defense', baseStats: { hp: 26, atk: 6, def: 10, spd: 4 } },
  iwamushi: { id: 'iwamushi', name: 'イワムシ',   attribute: 'earth',   role: 'defense', baseStats: { hp: 30, atk: 7, def: 11, spd: 3 } },
  // 風
  soyokaze: { id: 'soyokaze', name: 'ソヨカゼ',   attribute: 'wind',    role: 'support', baseStats: { hp: 18, atk: 7, def: 4, spd: 11 } },
  kazaguruma: { id: 'kazaguruma', name: 'カザグルマ', attribute: 'wind', role: 'attack',  baseStats: { hp: 20, atk: 8, def: 4, spd: 12 } },
  // 光
  hikarimo: { id: 'hikarimo', name: 'ヒカリモ',   attribute: 'light',   role: 'support', baseStats: { hp: 20, atk: 6, def: 6, spd: 8 } },
  terimushi: { id: 'terimushi', name: 'テリムシ', attribute: 'light',   role: 'attack',  baseStats: { hp: 18, atk: 8, def: 5, spd: 9 } },
  // 闇
  yamitsubo: { id: 'yamitsubo', name: 'ヤミツボ', attribute: 'dark',    role: 'defense', baseStats: { hp: 22, atk: 7, def: 7, spd: 6 } },
  kuromaru: { id: 'kuromaru', name: 'クロマル',   attribute: 'dark',    role: 'attack',  baseStats: { hp: 20, atk: 9, def: 5, spd: 8 } },
  // 無
  karappo:  { id: 'karappo',  name: 'カラッポ',   attribute: 'void',    role: 'support', baseStats: { hp: 22, atk: 7, def: 6, spd: 7 } },
  utsuroi:  { id: 'utsuroi',  name: 'ウツロイ',   attribute: 'void',    role: 'attack',  baseStats: { hp: 20, atk: 8, def: 6, spd: 8 } },
};

export function getWildSpecies(id) {
  return WILD_SPECIES[id];
}
