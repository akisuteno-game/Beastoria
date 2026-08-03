/* ============================================================
   specialMoves.js
   種族ごとの獣魂技(必殺技)データ

   name: 技名
   description: 効果の説明(フレーバー)
   multiplier: 通常攻撃と比べた威力倍率のベース値
               (異姙化合成の同属性強化でさらに上昇する)
   ============================================================ */

export const SPECIAL_MOVES = {
  fangle: {
    name: '業火の牙',
    description: '全身を業火に包み、渾身の力で噛み砕く。通常攻撃を大きく上回る威力。',
    multiplier: 1.8,
  },
  mizmol: {
    name: '守りの波動',
    description: '身にまとった水の膜を打ち放ち、相手の勢いごと押し流す。',
    multiplier: 1.7,
  },
  leafy: {
    name: '癒しの葉風',
    description: '葉の刃を渦のように巻き上げて叩きつける。仲間を守る意志が力となる。',
    multiplier: 1.6,
  },
  kokerin: {
    name: '疾風の一撃',
    description: '風をまとって一瞬で間合いを詰め、鋭い一撃を叩き込む。',
    multiplier: 1.7,
  },
  shizuku: {
    name: '大地の鉄槌',
    description: '大地の重みを乗せた一撃で、相手ごと地面に沈める。',
    multiplier: 1.8,
  },
  pachitto: {
    name: '雷光乱撃',
    description: '雷をまとった体で連続突撃し、逃げる間も与えない。',
    multiplier: 1.9,
  },
};

const DEFAULT_MOVE = {
  name: '獣魂技',
  description: '内に秘めた力を解き放つ、渾身の一撃。',
  multiplier: 1.8,
};

export function getSpecialMove(speciesId) {
  return SPECIAL_MOVES[speciesId] ?? DEFAULT_MOVE;
}
