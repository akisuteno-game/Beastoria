/* ============================================================
   shopRender.js
   商店画面の描画
   ============================================================ */

import { ATTRIBUTES } from '../data/constants.js';
import { SHOP_STONE_LIST, STONE_PRICE, STONE_PURCHASE_AMOUNT } from '../data/shop.js';

export function renderShop(container, goldEl, inventory, onBuy) {
  goldEl.textContent = `所持金: ${inventory.gold} G`;
  container.innerHTML = '';

  SHOP_STONE_LIST.forEach(({ attribute, label }) => {
    const attr = ATTRIBUTES[attribute];
    const cost = STONE_PRICE * STONE_PURCHASE_AMOUNT;
    const affordable = inventory.hasGold(cost);

    const card = document.createElement('div');
    card.className = 'panel shop-item';
    card.innerHTML = `
      <span class="attr-badge ${attr.badgeClass}">${label}</span>
      <div class="shop-item__stock">所持: ${inventory.stones[attribute] ?? 0}個</div>
      <div class="shop-item__price">${STONE_PURCHASE_AMOUNT}個 = ${cost} G</div>
      <button class="btn btn--sm ${affordable ? '' : 'btn--ghost'}" ${affordable ? '' : 'disabled'}>購入する</button>
    `;
    card.querySelector('button').addEventListener('click', () => onBuy(attribute, cost));
    container.appendChild(card);
  });
}
