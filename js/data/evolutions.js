/* ============================================================
   evolutions.js
   進化データ(通常ルート)

   仕様: 全モンスターは2回の進化を経る(基本形 → 第1進化 → 第2進化の
   計3形態)。進化のたびに名称が変わる。進化には該当属性の属性石
   20個を消費し、初回進化時にその属性で固定される。

   ※ 進化後の名称・ステータス伸び率は仮値。バランス調整フェーズで
     正式に詰める。
   ============================================================ */

// speciesId -> [第1進化(stage2)の定義, 第2進化(stage3)の定義]
export const EVOLUTIONS = {
  fangle: [
    { stage: 2, name: 'フレイガル', statGrowth: { hp: 1.6, atk: 1.8, def: 1.5, spd: 1.4 } },
    { stage: 3, name: 'フレイガドン', statGrowth: { hp: 2.3, atk: 2.6, def: 2.1, spd: 1.8 } },
  ],
  mizmol: [
    { stage: 2, name: 'アクアレイス', statGrowth: { hp: 1.7, atk: 1.4, def: 1.7, spd: 1.4 } },
    { stage: 3, name: 'アクアレヴィオン', statGrowth: { hp: 2.4, atk: 1.9, def: 2.4, spd: 1.8 } },
  ],
  leafy: [
    { stage: 2, name: 'フォレスティア', statGrowth: { hp: 1.5, atk: 1.4, def: 1.5, spd: 1.7 } },
    { stage: 3, name: 'フォレストレント', statGrowth: { hp: 2.1, atk: 1.9, def: 2.1, spd: 2.3 } },
  ],
  kokerin: [
    { stage: 2, name: 'コケリオン', statGrowth: { hp: 1.5, atk: 1.4, def: 1.5, spd: 1.6 } },
    { stage: 3, name: 'モスドリアード', statGrowth: { hp: 2.1, atk: 1.9, def: 2.1, spd: 2.2 } },
  ],
  shizuku: [
    { stage: 2, name: 'シズガーディ', statGrowth: { hp: 1.7, atk: 1.3, def: 1.8, spd: 1.3 } },
    { stage: 3, name: 'アースバスチオン', statGrowth: { hp: 2.4, atk: 1.7, def: 2.5, spd: 1.6 } },
  ],
  pachitto: [
    { stage: 2, name: 'パチゼル', statGrowth: { hp: 1.5, atk: 1.8, def: 1.4, spd: 1.5 } },
    { stage: 3, name: 'パチュランダー', statGrowth: { hp: 2.1, atk: 2.6, def: 1.9, spd: 2.0 } },
  ],
};

// evolutionStage(現在) を指定すると、次の進化段階の定義を返す
// 例: currentStage=1 -> 第1進化(stage2)の定義, currentStage=2 -> 第2進化(stage3)の定義
export function getNextEvolutionData(speciesId, currentStage) {
  const line = EVOLUTIONS[speciesId];
  if (!line) return null;
  return line.find((def) => def.stage === currentStage + 1) ?? null;
}
