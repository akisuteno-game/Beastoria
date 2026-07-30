/* ============================================================
   spriteGen.js
   仮スプライト生成ユーティリティ

   本番のドット絵素材(64×64)が用意されるまでの間、属性カラーを
   使ったプレースホルダーのモンスター形状をcanvasで生成する。
   将来的には assets/ 配下の実素材(png)に差し替える想定。
   ============================================================ */

// 8x8のシンプルなモンスターシルエット(1=描画, 0=透明)
const SILHOUETTE = [
  '00111100',
  '01111110',
  '11011011',
  '11111111',
  '11111111',
  '01111110',
  '01000010',
  '01000010',
];

export function renderPlaceholderSprite(canvas, colorHex) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width; // 想定: 64
  const cell = size / 8;

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = colorHex;

  SILHOUETTE.forEach((row, y) => {
    [...row].forEach((bit, x) => {
      if (bit === '1') {
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    });
  });

  // 簡易的な縁取りで輪郭を強調
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, size, size);
}
