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
};

export function getNextAltEvolutionData(speciesId, currentStage) {
  const line = ALT_EVOLUTIONS[speciesId];
  if (!line) return null;
  return line.find((def) => def.stage === currentStage + 1) ?? null;
}
