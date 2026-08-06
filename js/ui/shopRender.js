/* ============================================================
   shopRender.js
   商店画面の描画
   ============================================================ */

import { ATTRIBUTES } from '../data/constants.js';
import { SHOP_STONE_ATTRIBUTES, STONE_PRICE, STONE_PURCHASE_AMOUNT } from '../data/shop.js';
import { BASIC_EGG } from '../data/eggs.js';

function renderStoneCard(container, attribute, inventory, onBuyStone) {
  const attr = ATTRIBUTES[attribute];
  const cost = STONE_PRICE * STONE_PURCHASE_AMOUNT;
  const affordable = inventory.hasGold(cost);

  const card = document.createElement('div');
  card.className = 'panel shop-item';
  card.innerHTML = `
    <span class="attr-badge ${attr.badgeClass}">${attr.stoneName}</span>
    <div class="shop-item__stock">所持: ${inventory.stones[attribute] ?? 0}個</div>
    <div class="shop-item__price">${STONE_PURCHASE_AMOUNT}個 = ${cost} G</div>
    <button class="btn btn--sm ${affordable ? '' : 'btn--ghost'}" ${affordable ? '' : 'disabled'}>購入する</button>
  `;
  card.querySelector('button').addEventListener('click', () => onBuyStone(attribute, cost));
  container.appendChild(card);
}

function renderEggCard(container, inventory, onBuyEgg) {
  const affordable = inventory.hasGold(BASIC_EGG.price);
  const owned = inventory.items[BASIC_EGG.id] ?? 0;

  const card = document.createElement('div');
  card.className = 'panel shop-item';
  card.innerHTML = `
    <span class="attr-badge" style="background: var(--color-gold); color: var(--color-void);">${BASIC_EGG.name}</span>
    <div class="shop-item__stock">所持: ${owned}個</div>
    <div class="shop-item__price">1個 = ${BASIC_EGG.price} G</div>
    <button class="btn btn--sm ${affordable ? '' : 'btn--ghost'}" ${affordable ? '' : 'disabled'}>購入する</button>
  `;
  card.querySelector('button').addEventListener('click', () => onBuyEgg());
  container.appendChild(card);
}

export function renderShop(container, goldEl, inventory, handlers) {
  goldEl.textContent = `所持金: ${inventory.gold} G`;
  container.innerHTML = '';

  renderEggCard(container, inventory, handlers.onBuyEgg);

  SHOP_STONE_ATTRIBUTES.forEach((attribute) => {
    renderStoneCard(container, attribute, inventory, handlers.onBuyStone);
  });
}
