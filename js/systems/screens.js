/* ============================================================
   screens.js
   画面遷移(スクリーンマネージャー)

   #game-root 直下の .screen 要素を data-screen 属性で切り替える、
   ごく小さな状態管理。本格的なシーン管理(戦闘・探索の遷移含む)は
   今後のフェーズで拡張する。
   ============================================================ */

export class ScreenManager {
  constructor(rootSelector = '#game-root') {
    this.root = document.querySelector(rootSelector);
    this.screens = new Map();
    this.root.querySelectorAll('.screen').forEach((el) => {
      this.screens.set(el.dataset.screen, el);
    });
  }

  show(name) {
    this.screens.forEach((el, key) => {
      el.classList.toggle('is-active', key === name);
    });
  }
}
