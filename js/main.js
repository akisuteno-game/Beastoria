/* ============================================================
   main.js
   エントリーポイント
   ============================================================ */

import { STARTERS, createMonsterInstance } from './data/monsters.js';
import { ScreenManager } from './systems/screens.js';
import { Party } from './systems/party.js';
import { initViewportScale } from './systems/viewport.js';
import { renderStarterGrid } from './ui/render.js';
import { renderPartyLanes } from './ui/partyRender.js';

let selectedStarter = null;
const party = new Party();

function refreshPartyScreen() {
  renderPartyLanes(
    document.querySelector('#party-front'),
    document.querySelector('#party-back'),
    party,
    {
      onToggleRow: (instanceId) => {
        party.toggleRow(instanceId);
        refreshPartyScreen();
      },
      onRemove: (instanceId) => {
        party.removeMember(instanceId);
        refreshPartyScreen();
      },
    }
  );
}

function init() {
  initViewportScale();

  const screens = new ScreenManager();
  screens.show('title');

  document.querySelector('#start-btn').addEventListener('click', () => {
    screens.show('home');
  });

  const grid = document.querySelector('#starter-grid');
  const confirmBtn = document.querySelector('#confirm-starter-btn');

  renderStarterGrid(grid, STARTERS, (monster) => {
    selectedStarter = monster;
    confirmBtn.disabled = false;
    confirmBtn.textContent = `${monster.name} に決定`;
  });

  confirmBtn.addEventListener('click', () => {
    if (!selectedStarter) return;
    // スターターを所持モンスターとしてインスタンス化し、前衛にセットしてパーティ画面へ
    const instance = createMonsterInstance(selectedStarter);
    party.addMember(instance, 'front');
    refreshPartyScreen();
    screens.show('party');
  });

  document.querySelector('#party-done-btn').addEventListener('click', () => {
    // TODO: 探索・バトル画面へ接続(次フェーズ)
    console.log('確定したパーティ:', party.members);
    alert(
      `パーティを編成した！(前衛${party.frontRow.length}体 / 後衛${party.backRow.length}体)\nこの先の探索・バトル画面は次フェーズで実装します。`
    );
  });
}

document.addEventListener('DOMContentLoaded', init);
