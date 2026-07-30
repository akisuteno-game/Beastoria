/* ============================================================
   main.js
   エントリーポイント
   ============================================================ */

import { STARTERS, createMonsterInstance } from './data/monsters.js';
import { FOREST_MAP } from './data/mapNodes.js';
import { ScreenManager } from './systems/screens.js';
import { Party } from './systems/party.js';
import { Roster } from './systems/roster.js';
import { Battle } from './systems/battle.js';
import { Inventory } from './systems/inventory.js';
import { ExplorationState } from './systems/exploration.js';
import { evolveMonster } from './systems/evolution.js';
import { transformMonster } from './systems/transformation.js';
import { addExperience } from './systems/leveling.js';
import { createAllyUnit, createEnemyUnit } from './systems/battleUnit.js';
import { initViewportScale } from './systems/viewport.js';
import { renderStarterGrid } from './ui/render.js';
import { renderPartyLanes } from './ui/partyRender.js';
import { renderPartyAddList } from './ui/partyAddRender.js';
import { renderBattle } from './ui/battleRender.js';
import { renderMonsterDetail } from './ui/monsterDetailRender.js';
import { renderRoster } from './ui/rosterRender.js';
import { renderMap } from './ui/mapRender.js';

let selectedStarter = null;
const party = new Party();
const roster = new Roster();
const inventory = new Inventory();
const exploration = new ExplorationState(FOREST_MAP);

let battle = null;
let battleTimer = null;
let currentBattleNode = null;
const BATTLE_TICK_MS = 1200;

let detailInstanceId = null;
let detailReturnScreen = 'party'; // 詳細画面から「戻る」時の戻り先

let _screens = null;
function showScreenByName(name) {
  if (_screens) _screens.show(name);
}

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
      onDetail: (instanceId) => {
        detailInstanceId = instanceId;
        detailReturnScreen = 'party';
        refreshDetailScreen();
        showScreenByName('monster-detail');
      },
      onAdd: () => {
        refreshPartyAddScreen();
        showScreenByName('party-add');
      },
    }
  );
}

function refreshPartyAddScreen() {
  const inPartyIds = new Set(party.members.map((m) => m.monster.instanceId));
  const available = roster.list.filter((m) => !inPartyIds.has(m.instanceId));

  renderPartyAddList(document.querySelector('#party-add-grid'), available, (instanceId) => {
    const monster = roster.findById(instanceId);
    if (monster && !party.isFull()) {
      party.addMember(monster, 'back');
    }
    refreshPartyScreen();
    showScreenByName('party');
  });
}

function refreshRosterScreen() {
  renderRoster(document.querySelector('#roster-grid'), roster, STARTERS, (instanceId) => {
    detailInstanceId = instanceId;
    detailReturnScreen = 'roster';
    refreshDetailScreen();
    showScreenByName('monster-detail');
  });
}

function refreshDetailScreen() {
  const instance = roster.findById(detailInstanceId);
  if (!instance) return;
  renderMonsterDetail(document.querySelector('#monster-detail-body'), instance, inventory, {
    onEvolve: (instanceId) => {
      const target = roster.findById(instanceId);
      if (target) evolveMonster(target, inventory);
      refreshDetailScreen();
    },
    onTransform: (instanceId) => {
      const target = roster.findById(instanceId);
      if (target) transformMonster(target, inventory);
      refreshDetailScreen();
    },
  });
}

function refreshMapScreen() {
  renderMap(document.querySelector('#map-path'), exploration, (node) => {
    if (node.type === 'treasure') {
      claimTreasure(node);
    } else {
      startBattle(node);
    }
  });
}

function claimTreasure(node) {
  if (node.reward.stones) {
    inventory.addStones(node.reward.stones.attribute, node.reward.stones.amount);
  }
  if (node.reward.item) {
    inventory.addItem(node.reward.item.itemId, node.reward.item.amount);
  }
  if (node.reward.items) {
    node.reward.items.forEach((it) => inventory.addItem(it.itemId, it.amount));
  }
  exploration.clearNode(node.id);
  refreshMapScreen();
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

  if (battle.status === 'win') {
    if (currentBattleNode) {
      const xpReward = currentBattleNode.xpReward ?? 0;
      party.members.forEach((member) => addExperience(member.monster, xpReward));
      exploration.clearNode(currentBattleNode.id);
    }
  }

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

function startBattle(node) {
  currentBattleNode = node;
  const allyUnits = party.members.map((member) => createAllyUnit(member));
  const enemyUnits = node.enemyGroup.map((data) => createEnemyUnit(data));
  battle = new Battle(allyUnits, enemyUnits);

  document.querySelector('#battle-back-btn').style.display = 'none';
  document.querySelector('#battle-pause-btn').style.display = '';
  document.querySelector('#battle-pause-btn').textContent = '一時停止';

  showScreenByName('battle');
  refreshBattleScreen();
  startBattleLoop();
}

function init() {
  initViewportScale();

  const screens = new ScreenManager();
  _screens = screens;
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
    roster.addMonster(instance);
    party.addMember(instance, 'front');
    refreshPartyScreen();
    screens.show('party');
  });

  document.querySelector('#party-done-btn').addEventListener('click', () => {
    if (party.members.length === 0) return;
    refreshMapScreen();
    screens.show('map');
  });

  document.querySelector('#party-add-back-btn').addEventListener('click', () => {
    refreshPartyScreen();
    screens.show('party');
  });

  document.querySelector('#map-party-btn').addEventListener('click', () => {
    refreshPartyScreen();
    screens.show('party');
  });

  document.querySelector('#roster-open-btn').addEventListener('click', () => {
    refreshRosterScreen();
    screens.show('roster');
  });

  document.querySelector('#roster-back-btn').addEventListener('click', () => {
    screens.show('party');
  });

  document.querySelector('#detail-back-btn').addEventListener('click', () => {
    if (detailReturnScreen === 'roster') {
      refreshRosterScreen();
    } else {
      refreshPartyScreen();
    }
    screens.show(detailReturnScreen);
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
    refreshMapScreen();
    screens.show('map');
  });
}

document.addEventListener('DOMContentLoaded', init);
