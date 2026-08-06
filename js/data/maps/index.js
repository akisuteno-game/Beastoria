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
import { WIND_PLATEAU_MAP } from './windPlateauMap.js';
import { LIGHT_TEMPLE_MAP } from './lightTempleMap.js';
import { SHADOW_LABYRINTH_MAP } from './shadowLabyrinthMap.js';
import { VOID_SPACE_MAP } from './voidSpaceMap.js';
import { EARTH_RIFT_MAP } from './earthRiftMap.js';
import { THUNDER_WILDERNESS_MAP } from './thunderWildernessMap.js';
import { DEEP_FOREST_MAP } from './deepForestMap.js';
import { BLAZING_CRATER_MAP } from './blazingCraterMap.js';
import { FROZEN_GLACIER_MAP } from './frozenGlacierMap.js';
import { CHAOS_RIFT_MAP } from './chaosRiftMap.js';

export const MAPS = {
  forest: FOREST_MAP,
  cove: COVE_MAP,
  cavern: CAVERN_MAP,
  highlands: HIGHLANDS_MAP,
  spire: SPIRE_MAP,
  windPlateau: WIND_PLATEAU_MAP,
  lightTemple: LIGHT_TEMPLE_MAP,
  shadowLabyrinth: SHADOW_LABYRINTH_MAP,
  voidSpace: VOID_SPACE_MAP,
  earthRift: EARTH_RIFT_MAP,
  thunderWilderness: THUNDER_WILDERNESS_MAP,
  deepForest: DEEP_FOREST_MAP,
  blazingCrater: BLAZING_CRATER_MAP,
  frozenGlacier: FROZEN_GLACIER_MAP,
  chaosRift: CHAOS_RIFT_MAP,
};

export const MAP_ORDER = [
  'forest', 'cove', 'cavern', 'highlands', 'spire',
  'windPlateau', 'lightTemple', 'shadowLabyrinth', 'voidSpace', 'earthRift',
  'thunderWilderness', 'deepForest', 'blazingCrater', 'frozenGlacier', 'chaosRift',
];

export const NODE_TYPE_LABEL = {
  battle: 'バトル',
  treasure: '宝箱',
  boss: 'ボス',
};
