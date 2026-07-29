/* ============================================================
   main.js
   エントリーポイント
   ============================================================ */

import { STARTERS, createMonsterInstance } from './data/monsters.js';
import { SAMPLE_ENEMY_GROUP } from './data/enemies.js';
import { ScreenManager } from './systems/screens.js';
import { Party } from './systems/party.js';
import { Battle } from './systems/battle.js';
import { createAllyUnit, createEnemyUnit } from './systems/battleUnit.js';
import { initViewportScale } from './systems/viewport.js';
import { renderStarterGrid } from './ui/render.js';
import { renderPartyLanes } from './ui/partyRender.js';
import { renderBattle } from './ui/battleRender.js';

let selectedStarter = null;
const party = new Party();

let battle = null;
let battleTimer = null;
const BATTLE_TICK_MS = 1200;

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

function refreshBattleScreen() {
  renderBattle(
    document.querySelector('#battle-ally-lane'),
    document.querySelector('#battle-enemy-lane'),
    document.querySelector('#battle-log'),
    battle,
    (unitId) => {
      battle.useSpecial(unitId);
      refreshBattleScreen();
      handleBattleEndIfNeeded();
    }
  );
}

function handleBattleEndIfNeeded() {
  if (battle.status === 'ongoing') return;
  stopBattleLoop();
  document.querySelector('#battle-back-btn').style.display = '';
  document.querySelector('#battle-pause-btn').style.display = 'none';
}

function startBattleLoop() {
  stopBattleLoop();
  battleTimer = setInterval(() => {
    battle.advance();
    refreshBattleScreen();
    handleBattleEndIfNeeded();
  }, BATTLE_TICK_MS);
}

function stopBattleLoop() {
  if (battleTimer) {
    clearInterval(battleTimer);
    battleTimer = null;
  }
}

function startBattle(screens) {
  const allyUnits = party.members.map((member) => createAllyUnit(member));
  const enemyUnits = SAMPLE_ENEMY_GROUP.map((data) => createEnemyUnit(data));
  battle = new Battle(allyUnits, enemyUnits);

  document.querySelector('#battle-back-btn').style.display = 'none';
  document.querySelector('#battle-pause-btn').style.display = '';
  document.querySelector('#battle-pause-btn').textContent = '一時停止';

  screens.show('battle');
  refreshBattleScreen();
  startBattleLoop();
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
    const instance = createMonsterInstance(selectedStarter);
    party.addMember(instance, 'front');
    refreshPartyScreen();
    screens.show('party');
  });

  document.querySelector('#party-done-btn').addEventListener('click', () => {
    if (party.members.length === 0) return;
    startBattle(screens);
  });

  document.querySelector('#battle-pause-btn').addEventListener('click', (e) => {
    if (battleTimer) {
      stopBattleLoop();
      e.target.textContent = '再開';
    } else if (battle && battle.status === 'ongoing') {
      startBattleLoop();
      e.target.textContent = '一時停止';
    }
  });

  document.querySelector('#battle-back-btn').addEventListener('click', () => {
    screens.show('party');
  });
}

document.addEventListener('DOMContentLoaded', init);
