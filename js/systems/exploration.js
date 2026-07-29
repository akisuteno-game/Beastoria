/* ============================================================
   exploration.js
   探索システム

   一本道のマップを先頭から順に進む形。現在地(currentIndex)より
   手前は「クリア済み」、現在地は「挑戦可能」、その先は「未開放」。
   ============================================================ */

export class ExplorationState {
  constructor(mapData) {
    this.mapData = mapData;
    this.currentIndex = 0;
  }

  getCurrentNode() {
    return this.mapData[this.currentIndex] ?? null;
  }

  getNodeStatus(index) {
    if (index < this.currentIndex) return 'cleared';
    if (index === this.currentIndex) return 'current';
    return 'locked';
  }

  isComplete() {
    return this.currentIndex >= this.mapData.length;
  }

  advance() {
    if (!this.isComplete()) {
      this.currentIndex += 1;
    }
  }
}
