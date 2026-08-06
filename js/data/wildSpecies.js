/* ============================================================
   wildSpecies.js
   野生モンスター(敵専用)の種族データ

   プレイヤーが仲間にするモンスター(スターター・タマゴ)は
   カタカナ表記だが、野生の敵モンスターはひらがな表記で区別する。
   タマゴから生まれてくる存在という設定は同じで、内部的にも
   同じ「種族データ→レベルに応じたステータス計算」という
   仕組みを利用している(wildEncounter.js参照)。

   baseStats はレベル1時点の値。
   ============================================================ */

export const WILD_SPECIES = {
  // 炎
  hibana:   { id: 'hibana',   name: 'ひばな',     attribute: 'fire',    role: 'attack',  baseStats: { hp: 18, atk: 7, def: 3, spd: 8 } },
  meramera: { id: 'meramera', name: 'めらめら',   attribute: 'fire',    role: 'attack',  baseStats: { hp: 22, atk: 8, def: 4, spd: 7 } },
  // 水
  shizukun: { id: 'shizukun', name: 'しずくん',   attribute: 'water',   role: 'defense', baseStats: { hp: 24, atk: 6, def: 7, spd: 6 } },
  mizuumi:  { id: 'mizuumi',  name: 'みずうみ',   attribute: 'water',   role: 'defense', baseStats: { hp: 28, atk: 6, def: 8, spd: 5 } },
  // 森
  kokekko:  { id: 'kokekko',  name: 'こけっこ',   attribute: 'forest',  role: 'support', baseStats: { hp: 20, atk: 6, def: 5, spd: 8 } },
  happan:   { id: 'happan',   name: 'はっぱん',   attribute: 'forest',  role: 'support', baseStats: { hp: 22, atk: 7, def: 6, spd: 7 } },
  // 雷
  ikazuchi: { id: 'ikazuchi', name: 'いかづち',   attribute: 'thunder', role: 'attack',  baseStats: { hp: 18, atk: 9, def: 3, spd: 10 } },
  biribiri: { id: 'biribiri', name: 'びりびり',   attribute: 'thunder', role: 'attack',  baseStats: { hp: 16, atk: 8, def: 2, spd: 12 } },
  // 氷
  koorin:   { id: 'koorin',   name: 'こおりん',   attribute: 'ice',     role: 'defense', baseStats: { hp: 24, atk: 7, def: 8, spd: 5 } },
  tsurataran: { id: 'tsurataran', name: 'つららん', attribute: 'ice',   role: 'attack',  baseStats: { hp: 20, atk: 9, def: 5, spd: 7 } },
  // 地
  tsuchinko: { id: 'tsuchinko', name: 'つちんこ',  attribute: 'earth',  role: 'defense', baseStats: { hp: 26, atk: 6, def: 10, spd: 4 } },
  iwamushi: { id: 'iwamushi', name: 'いわむし',   attribute: 'earth',   role: 'defense', baseStats: { hp: 30, atk: 7, def: 11, spd: 3 } },
  // 風
  soyokaze: { id: 'soyokaze', name: 'そよかぜ',   attribute: 'wind',    role: 'support', baseStats: { hp: 18, atk: 7, def: 4, spd: 11 } },
  kazaguruma: { id: 'kazaguruma', name: 'かざぐるま', attribute: 'wind', role: 'attack',  baseStats: { hp: 20, atk: 8, def: 4, spd: 12 } },
  // 光
  hikarimo: { id: 'hikarimo', name: 'ひかりも',   attribute: 'light',   role: 'support', baseStats: { hp: 20, atk: 6, def: 6, spd: 8 } },
  terimushi: { id: 'terimushi', name: 'てりむし', attribute: 'light',   role: 'attack',  baseStats: { hp: 18, atk: 8, def: 5, spd: 9 } },
  // 闇
  yamitsubo: { id: 'yamitsubo', name: 'やみつぼ', attribute: 'dark',    role: 'defense', baseStats: { hp: 22, atk: 7, def: 7, spd: 6 } },
  kuromaru: { id: 'kuromaru', name: 'くろまる',   attribute: 'dark',    role: 'attack',  baseStats: { hp: 20, atk: 9, def: 5, spd: 8 } },
  // 無
  karappo:  { id: 'karappo',  name: 'からっぽ',   attribute: 'void',    role: 'support', baseStats: { hp: 22, atk: 7, def: 6, spd: 7 } },
  utsuroi:  { id: 'utsuroi',  name: 'うつろい',   attribute: 'void',    role: 'attack',  baseStats: { hp: 20, atk: 8, def: 6, spd: 8 } },
};

export function getWildSpecies(id) {
  return WILD_SPECIES[id];
}
