/* ============================================================
   saveSlotRender.js
   セーブ/ロード画面のスロット一覧描画(共通)
   ============================================================ */

import { hasSaveData, loadSaveData, SLOT_LABEL } from '../systems/saveLoad.js';

function formatDate(ts) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// mode: 'save' | 'load'
// slots: 表示するスロットのid配列(セーブ画面はslot1〜3のみ、ロード画面はauto含む全部)
export function renderSaveSlots(container, slots, mode, onSelectSlot) {
  container.innerHTML = '';

  slots.forEach((slot) => {
    const exists = hasSaveData(slot);
    const data = exists ? loadSaveData(slot) : null;

    const card = document.createElement('div');
    card.className = 'panel save-slot-item';

    const summaryHtml = data
      ? `<div class="save-slot-item__summary">
           ${data.summary?.leadName ? `${data.summary.leadName} Lv.${data.summary.leadLevel} ・ 所持${data.summary.partySize}体 ・ ${data.summary.gold}G` : 'データあり'}
           <br>${data.savedAt ? formatDate(data.savedAt) : ''}
         </div>`
      : `<div class="save-slot-item__summary save-slot-item__summary--empty">データなし</div>`;

    const canAct = mode === 'save' || exists;
    const actionLabel = mode === 'save' ? (exists ? 'ここに上書き' : 'ここにセーブ') : 'このデータで始める';

    card.innerHTML = `
      <div class="save-slot-item__label">${SLOT_LABEL[slot]}</div>
      ${summaryHtml}
      <button class="btn btn--sm ${canAct ? '' : 'btn--ghost'}" ${canAct ? '' : 'disabled'}>${actionLabel}</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      if (canAct) onSelectSlot(slot);
    });
    container.appendChild(card);
  });
}
