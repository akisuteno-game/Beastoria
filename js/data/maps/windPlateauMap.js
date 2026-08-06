import { buildMap } from './mapBuilder.js';
export const WIND_PLATEAU_MAP = buildMap({
  id: 'windPlateau', name: '風の高原',
  primarySpecies: ['soyokaze', 'kazaguruma', 'soyokaze'],
  altSpecies: ['ikazuchi', 'hikarimo'],
  bossSpecies: 'kazaguruma', bossAddSpecies: 'soyokaze',
  levelBase: 26,
  treasureAttrs: ['wind', 'wind', 'thunder', 'light'],
  goldBase: 40,
});
