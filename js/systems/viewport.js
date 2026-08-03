/* ============================================================
   viewport.js
   画面フィッティング

   ゲームは一定の基準解像度で組み立て、実際の画面サイズに合わせて
   CSS transform: scaleで拡大・縮小する(レターボックス方式)。
   スマホは縦長の基準解像度、iPad等のタブレットは正方形に近い
   基準解像度を使うことで、タブレットではより広々とレイアウトされる
   (CSS側は body.is-tablet を見て列数などを調整する)。
   ============================================================ */

const PHONE_DESIGN = { width: 414, height: 896 };
const TABLET_DESIGN = { width: 900, height: 1200 };

// 画面の短辺がこの値以上ならタブレット扱いにする(仮の閾値)
const TABLET_MIN_DIMENSION = 700;

function isTabletSize() {
  return Math.min(window.innerWidth, window.innerHeight) >= TABLET_MIN_DIMENSION;
}

export function initViewportScale() {
  const frame = document.querySelector('#viewport-frame');

  function applyScale() {
    const tablet = isTabletSize();
    const design = tablet ? TABLET_DESIGN : PHONE_DESIGN;

    document.body.classList.toggle('is-tablet', tablet);
    frame.style.width = `${design.width}px`;
    frame.style.height = `${design.height}px`;

    const scale = Math.min(
      window.innerWidth / design.width,
      window.innerHeight / design.height
    );
    frame.style.transform = `scale(${scale})`;
  }

  applyScale();
  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', applyScale);
}
