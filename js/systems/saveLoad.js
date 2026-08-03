/* ============================================================
   saveLoad.js
   セーブ・ロード

   スロットは4つ: 'auto'(自動セーブ専用) と 'slot1'〜'slot3'(手動セーブ)。
   所持モンスター(Roster)・パーティ編成・所持アイテム・
   全マップそれぞれの探索進行状況をlocalStorageに保存する。
   バトル中の一時的な状態は保存しない(バトルはノードに再挑戦
   すれば毎回フルHPで始まる)。
   ============================================================ */

const KEY_PREFIX = 'beastoria-save-v4-';

export const SAVE_SLOTS = ['auto', 'slot1', 'slot2', 'slot3'];

export const SLOT_LABEL = {
  auto: 'オートセーブ',
  slot1: 'セーブ1',
  slot2: 'セーブ2',
  slot3: 'セーブ3',
};

function keyFor(slot) {
  return KEY_PREFIX + slot;
}

export function hasSaveData(slot) {
  try {
    return localStorage.getItem(keyFor(slot)) !== null;
  } catch (e) {
    return false;
  }
}

export function saveGame(slot, { roster, party, inventory, explorations, currentMapId }) {
  try {
    const explorationsPayload = {};
    Object.entries(explorations).forEach(([mapId, exploration]) => {
      explorationsPayload[mapId] = {
        unlocked: [...exploration.unlocked],
        cleared: [...exploration.cleared],
      };
    });

    const leadMember = party.members[0]?.monster;

    const payload = {
      savedAt: Date.now(),
      summary: {
        leadName: leadMember ? leadMember.name : null,
        leadLevel: leadMember ? leadMember.level : null,
        partySize: party.members.length,
        gold: inventory.gold,
      },
      roster: roster.list,
      partyMembers: party.members.map((m) => ({
        instanceId: m.monster.instanceId,
        row: m.row,
      })),
      stones: inventory.stones,
      crystals: inventory.crystals,
      items: inventory.items,
      gold: inventory.gold,
      explorations: explorationsPayload,
      currentMapId,
    };
    localStorage.setItem(keyFor(slot), JSON.stringify(payload));
    return true;
  } catch (e) {
    return false;
  }
}

export function loadSaveData(slot) {
  try {
    const raw = localStorage.getItem(keyFor(slot));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
