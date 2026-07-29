/* ============================================================
   viewport.js
   画面フィッティング

   ゲームは常に一定の基準解像度(DESIGN_WIDTH × DESIGN_HEIGHT)で
   組み立て、実際の画面サイズに合わせてCSS transform: scaleで
   拡大・縮小する。レイアウトを画面幅ごとに作り分けるのではなく、
   「ぴったり収まる分だけ拡大縮小する」方式(レターボックス)。
   ============================================================ */

const DESIGN_WIDTH = 414;
const DESIGN_HEIGHT = 896;

export function initViewportScale() {
  const frame = document.querySelector('#viewport-frame');
  frame.style.width = `${DESIGN_WIDTH}px`;
  frame.style.height = `${DESIGN_HEIGHT}px`;

  function applyScale() {
    const scale = Math.min(
      window.innerWidth / DESIGN_WIDTH,
      window.innerHeight / DESIGN_HEIGHT
    );
    frame.style.transform = `scale(${scale})`;
  }

  applyScale();
  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', applyScale);
}
