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
import { FOREST_MAP } from './data/mapNodes.js';
import { saveGame } from './systems/saveLoad.js';
import { syncInstanceSeq } from './data/monsters.js';

export const state = {
  party: new Party(),
  roster: new Roster(),
  inventory: new Inventory(),
  exploration: new ExplorationState(FOREST_MAP),

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

// 主要なアクションのたびに呼び、進行状況を保存する
export function persist() {
  saveGame({
    roster: state.roster,
    party: state.party,
    inventory: state.inventory,
    exploration: state.exploration,
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
  state.inventory.items = data.items;
  state.inventory.gold = data.gold ?? state.inventory.gold;

  state.exploration = new ExplorationState(FOREST_MAP);
  state.exploration.unlocked = new Set(data.exploration.unlocked);
  state.exploration.cleared = new Set(data.exploration.cleared);
}
