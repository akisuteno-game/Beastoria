/* ============================================================
   main.js
   エントリーポイント

   状態はstate.js、画面ごとの処理はscreens/*.jsに分割してある。
   ここでは初期化と、各画面のイベント登録(setup)を呼ぶだけ。
   ============================================================ */

import { state } from './state.js';
import { ScreenManager } from './systems/screens.js';
import { initViewportScale } from './systems/viewport.js';

import { setup as setupTitleScreen } from './screens/titleScreen.js';
import { setup as setupHomeScreen } from './screens/homeScreen.js';
import { setup as setupPartyScreen } from './screens/partyScreen.js';
import { setup as setupPartyAddScreen } from './screens/partyAddScreen.js';
import { setup as setupRosterScreen } from './screens/rosterScreen.js';
import { setup as setupShopScreen } from './screens/shopScreen.js';
import { setup as setupEggScreen } from './screens/eggScreen.js';
import { setup as setupMonsterDetailScreen } from './screens/monsterDetailScreen.js';
import { setup as setupMapSelectScreen } from './screens/mapSelectScreen.js';
import { setup as setupMapScreen } from './screens/mapScreen.js';
import { setup as setupBattleScreen } from './screens/battleScreen.js';

function init() {
  initViewportScale();

  state.screens = new ScreenManager();
  state.screens.show('title');

  setupTitleScreen();
  setupHomeScreen();
  setupPartyScreen();
  setupPartyAddScreen();
  setupRosterScreen();
  setupShopScreen();
  setupEggScreen();
  setupMonsterDetailScreen();
  setupMapSelectScreen();
  setupMapScreen();
  setupBattleScreen();
}

document.addEventListener('DOMContentLoaded', init);
