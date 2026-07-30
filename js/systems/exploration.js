/* ============================================================
   exploration.js
   探索システム(分岐マップ対応)

   マップはグラフ構造(mapData.nodes, mapData.startId)。
   ノードをクリアすると、その`next`に含まれるノード群が同時に
   開放される。分岐先の一方をクリアすると、同じ分岐元から
   開放されていたもう一方の未クリアノードは閉じる
   (今回の周回では選べなくなる)。
   ============================================================ */

export class ExplorationState {
  constructor(mapData) {
    this.mapData = mapData;
    this.unlocked = new Set([mapData.startId]);
    this.cleared = new Set();
  }

  getNode(id) {
    return this.mapData.nodes[id] ?? null;
  }

  getNodeStatus(id) {
    if (this.cleared.has(id)) return 'cleared';
    if (this.unlocked.has(id)) return 'current';
    return 'locked';
  }

  isAvailable(id) {
    return this.unlocked.has(id) && !this.cleared.has(id);
  }

  // idを含む`next`を持つノード(=分岐元)を探し、そのきょうだいノードを返す
  _findSiblings(id) {
    const siblings = [];
    Object.values(this.mapData.nodes).forEach((node) => {
      if (node.next.includes(id)) {
        node.next.forEach((siblingId) => {
          if (siblingId !== id) siblings.push(siblingId);
        });
      }
    });
    return siblings;
  }

  clearNode(id) {
    if (!this.isAvailable(id)) return;
    this.cleared.add(id);

    // 選ばなかった分岐先は閉じる(クリア済みでなければ)
    this._findSiblings(id).forEach((siblingId) => {
      if (!this.cleared.has(siblingId)) {
        this.unlocked.delete(siblingId);
      }
    });

    // このノードの先を開放する
    this.getNode(id).next.forEach((nextId) => this.unlocked.add(nextId));
  }

  isComplete() {
    if (this.cleared.size === 0) return false;
    // 現在開放されていて、まだクリアしていないノードが無ければ探索完了
    return [...this.unlocked].every((id) => this.cleared.has(id));
  }
}
