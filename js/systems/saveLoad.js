/* ============================================================
   saveLoad.js
   セーブ・ロード(タイトル画面の「つづきから」用)

   所持モンスター(Roster)・パーティ編成・所持アイテム・
   全マップそれぞれの探索進行状況をlocalStorageに保存する。
   バトル中の一時的な状態は保存しない(バトルはノードに再挑戦
   すれば毎回フルHPで始まる)。
   ============================================================ */

const SAVE_KEY = 'beastoria-save-v2';

export function hasSaveData() {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch (e) {
    return false;
  }
}

export function saveGame({ roster, party, inventory, explorations, currentMapId }) {
  try {
    const explorationsPayload = {};
    Object.entries(explorations).forEach(([mapId, exploration]) => {
      explorationsPayload[mapId] = {
        unlocked: [...exploration.unlocked],
        cleared: [...exploration.cleared],
      };
    });

    const payload = {
      roster: roster.list,
      partyMembers: party.members.map((m) => ({
        instanceId: m.monster.instanceId,
        row: m.row,
      })),
      stones: inventory.stones,
      items: inventory.items,
      gold: inventory.gold,
      explorations: explorationsPayload,
      currentMapId,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    return true;
  } catch (e) {
    return false;
  }
}

export function loadSaveData() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
