/* ============================================================
   evolutionsAlt.js
   進化データ(異姿化ルート)

   仕様: 異姿化した個体は、通常の進化ルートとは別の進化ルートを
   歩む。異姿化後の姿(段階1)からさらに2回進化できる(計3形態)。

   ※ 現状はファングルの異姿化ルートのみデモとして用意している。
     名称・ステータス伸び率は仮値。
   ============================================================ */

export const ALT_EVOLUTIONS = {
  fangle: [
    { stage: 2, name: 'クロエンガル', statGrowth: { hp: 1.5, atk: 2.0, def: 1.3, spd: 1.6 } },
    { stage: 3, name: 'ゴウカエンペラー', statGrowth: { hp: 2.1, atk: 2.9, def: 1.8, spd: 2.0 } },
  ],
  mizmol: [
    { stage: 2, name: 'シンチョウガル', statGrowth: { hp: 2.0, atk: 1.5, def: 1.7, spd: 1.2 } },
    { stage: 3, name: 'アビスマジェスタ', statGrowth: { hp: 2.8, atk: 2.1, def: 2.3, spd: 1.6 } },
  ],
  leafy: [
    { stage: 2, name: 'ムーングロウ', statGrowth: { hp: 1.5, atk: 1.5, def: 1.4, spd: 1.9 } },
    { stage: 3, name: 'ルナヴェルデ', statGrowth: { hp: 2.1, atk: 2.1, def: 1.9, spd: 2.6 } },
  ],
  kokerin: [
    { stage: 2, name: '星のドリアード', statGrowth: { hp: 1.7, atk: 1.6, def: 1.7, spd: 2.0 } },
    { stage: 3, name: '星霊木モルドゥルース', statGrowth: { hp: 2.3, atk: 2.2, def: 2.3, spd: 2.7 } },
  ],
  shizuku: [
    { stage: 2, name: '深淵の守人', statGrowth: { hp: 1.9, atk: 1.5, def: 2.1, spd: 1.2 } },
    { stage: 3, name: '深淵王ドムスビス', statGrowth: { hp: 2.6, atk: 2.0, def: 2.8, spd: 1.5 } },
  ],
  pachitto: [
    { stage: 2, name: '灼火のパチゼルフ', statGrowth: { hp: 1.6, atk: 2.1, def: 1.3, spd: 1.7 } },
    { stage: 3, name: '業炎皇パイロクス', statGrowth: { hp: 2.2, atk: 3.0, def: 1.7, spd: 2.2 } },
  ],
};

export function getNextAltEvolutionData(speciesId, currentStage) {
  const line = ALT_EVOLUTIONS[speciesId];
  if (!line) return null;
  return line.find((def) => def.stage === currentStage + 1) ?? null;
}
