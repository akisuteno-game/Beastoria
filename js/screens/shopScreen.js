/* ============================================================
   screens/shopScreen.js
   商店画面
   ============================================================ */

import { state, showScreen, persist } from '../state.js';
import { renderShop } from '../ui/shopRender.js';
import { STONE_PURCHASE_AMOUNT } from '../data/shop.js';

export function refreshShopScreen() {
  renderShop(
    document.querySelector('#shop-list'),
    document.querySelector('#shop-gold'),
    state.inventory,
    (attribute, cost) => {
      if (state.inventory.spendGold(cost)) {
        state.inventory.addStones(attribute, STONE_PURCHASE_AMOUNT);
      }
      refreshShopScreen();
      persist();
    }
  );
}

export function setup() {
  document.querySelector('#shop-open-btn').addEventListener('click', () => {
    refreshShopScreen();
    showScreen('shop');
  });

  document.querySelector('#shop-back-btn').addEventListener('click', () => {
    showScreen('party');
  });
}
