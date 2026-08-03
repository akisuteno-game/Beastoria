/* ============================================================
   state.js
   ゲーム全体で共有する状態

   各screens/*.jsはここから状態を読み書きする。画面ごとにファイルを
   分けても、パーティやRosterなどの「同じデータ」を触れるようにする
   ための共有モジュール。
   ============================================================ */

import { Party } from './systems/party.js';
import { Roster } from './systems/roster.js';
import { Inventory } from './systems/inventory.js';
import { ExplorationState } from './systems/exploration.js';
import { MAPS, MAP_ORDER } from './data/maps/index.js';
import { saveGame } from './systems/saveLoad.js';
import { syncInstanceSeq } from './data/monsters.js';

function freshExplorations() {
  const result = {};
  MAP_ORDER.forEach((mapId) => {
    result[mapId] = new ExplorationState(MAPS[mapId]);
  });
  return result;
}

export const state = {
  party: new Party(),
  roster: new Roster(),
  inventory: new Inventory(),

  explorations: freshExplorations(), // mapId -> ExplorationState
  currentMapId: MAP_ORDER[0],

  screens: null, // main.jsでScreenManagerをセットする

  selectedStarter: null,

  battle: null,
  battleTimer: null,
  currentBattleNode: null,

  detailInstanceId: null,
  detailReturnScreen: 'party', // モンスター詳細画面から「戻る」時の戻り先
};

export function showScreen(name) {
  if (state.screens) state.screens.show(name);
}

export function getCurrentExploration() {
  return state.explorations[state.currentMapId];
}

// 前のマップのボスを倒していれば次のマップが開放される(最初のマップは常に開放)
export function isMapUnlocked(mapId) {
  const idx = MAP_ORDER.indexOf(mapId);
  if (idx <= 0) return true;

  const prevMapId = MAP_ORDER[idx - 1];
  const prevMapData = MAPS[prevMapId];
  const bossNode = Object.values(prevMapData.nodes).find((n) => n.type === 'boss');
  if (!bossNode) return true;

  return state.explorations[prevMapId].cleared.has(bossNode.id);
}

// バトル後・編成変更後など、主要なアクションのたびに呼び、
// オートセーブ枠に自動で保存する
export function persist() {
  saveGame('auto', {
    roster: state.roster,
    party: state.party,
    inventory: state.inventory,
    explorations: state.explorations,
    currentMapId: state.currentMapId,
  });
}

// 指定したスロットへ手動保存する(セーブ画面から呼ぶ)
export function persistToSlot(slot) {
  return saveGame(slot, {
    roster: state.roster,
    party: state.party,
    inventory: state.inventory,
    explorations: state.explorations,
    currentMapId: state.currentMapId,
  });
}

// セーブデータから各状態を復元する
export function applySaveData(data) {
  state.roster = new Roster();
  data.roster.forEach((m) => state.roster.addMonster(m));
  syncInstanceSeq(state.roster.list);

  state.party = new Party();
  data.partyMembers.forEach(({ instanceId, row }) => {
    const monster = state.roster.findById(instanceId);
    if (monster) state.party.addMember(monster, row);
  });

  state.inventory = new Inventory();
  state.inventory.stones = data.stones;
  state.inventory.crystals = data.crystals ?? {};
  state.inventory.items = data.items;
  state.inventory.gold = data.gold ?? state.inventory.gold;

  state.explorations = freshExplorations();
  Object.entries(data.explorations ?? {}).forEach(([mapId, saved]) => {
    if (state.explorations[mapId]) {
      state.explorations[mapId].unlocked = new Set(saved.unlocked);
      state.explorations[mapId].cleared = new Set(saved.cleared);
    }
  });
  state.currentMapId = data.currentMapId ?? MAP_ORDER[0];
}
