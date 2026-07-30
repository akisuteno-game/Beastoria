/* ============================================================
   index.js (maps)
   全マップの一覧・出現順

   MAP_ORDERの順に、前のマップのボスをクリアすると次のマップが
   開放される(map-select画面側で判定に使う)。
   ============================================================ */

import { FOREST_MAP } from './forestMap.js';
import { COVE_MAP } from './coveMap.js';
import { CAVERN_MAP } from './cavernMap.js';
import { HIGHLANDS_MAP } from './highlandsMap.js';
import { SPIRE_MAP } from './spireMap.js';

export const MAPS = {
  forest: FOREST_MAP,
  cove: COVE_MAP,
  cavern: CAVERN_MAP,
  highlands: HIGHLANDS_MAP,
  spire: SPIRE_MAP,
};

export const MAP_ORDER = ['forest', 'cove', 'cavern', 'highlands', 'spire'];

export const NODE_TYPE_LABEL = {
  battle: 'バトル',
  treasure: '宝箱',
  boss: 'ボス',
};
