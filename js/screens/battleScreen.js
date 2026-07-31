/* ============================================================
   screens/battleScreen.js
   バトル画面
   ============================================================ */

import { state, showScreen, persist, getCurrentExploration } from '../state.js';
import { Battle } from '../systems/battle.js';
import { createAllyUnit, createEnemyUnit } from '../systems/battleUnit.js';
import { addExperience } from '../systems/leveling.js';
import { renderBattle } from '../ui/battleRender.js';
import { refreshMapScreen } from './mapScreen.js';

const BATTLE_TICK_MS = 1200;

function refreshBattleScreen() {
  renderBattle(
    document.querySelector('#battle-ally-lane'),
    document.querySelector('#battle-enemy-lane'),
    document.querySelector('#battle-log'),
    state.battle,
    (unitId) => {
      state.battle.useSpecial(unitId);
      refreshBattleScreen();
      handleBattleEndIfNeeded();
    }
  );
}

function handleBattleEndIfNeeded() {
  if (state.battle.status === 'ongoing') return;
  stopBattleLoop();

  if (state.battle.status === 'win') {
    const node = state.currentBattleNode;
    if (node) {
      const xpReward = node.xpReward ?? 0;
      state.party.members.forEach((member) => addExperience(member.monster, xpReward));
      getCurrentExploration().clearNode(node.id);
      state.inventory.addGold(node.goldReward ?? 0);
    }
    persist();
  }

  document.querySelector('#battle-back-btn').style.display = '';
  document.querySelector('#battle-pause-btn').style.display = 'none';
}

function startBattleLoop() {
  stopBattleLoop();
  state.battleTimer = setInterval(() => {
    state.battle.advance();
    refreshBattleScreen();
    handleBattleEndIfNeeded();
  }, BATTLE_TICK_MS);
}

function stopBattleLoop() {
  if (state.battleTimer) {
    clearInterval(state.battleTimer);
    state.battleTimer = null;
  }
}

export function startBattle(node) {
  state.currentBattleNode = node;
  const allyUnits = state.party.members.map((member) => createAllyUnit(member));
  const enemyUnits = node.enemyGroup.map((data) => createEnemyUnit(data));
  state.battle = new Battle(allyUnits, enemyUnits);

  document.querySelector('#battle-back-btn').style.display = 'none';
  document.querySelector('#battle-pause-btn').style.display = '';
  document.querySelector('#battle-pause-btn').textContent = '一時停止';

  showScreen('battle');
  refreshBattleScreen();
  startBattleLoop();
}

export function setup() {
  document.querySelector('#battle-pause-btn').addEventListener('click', (e) => {
    if (state.battleTimer) {
      stopBattleLoop();
      e.target.textContent = '再開';
    } else if (state.battle && state.battle.status === 'ongoing') {
      startBattleLoop();
      e.target.textContent = '一時停止';
    }
  });

  document.querySelector('#battle-back-btn').addEventListener('click', () => {
    refreshMapScreen();
    showScreen('map');
  });
}
