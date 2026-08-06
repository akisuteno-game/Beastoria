import { buildMap } from './mapBuilder.js';
export const SPIRE_MAP = buildMap({
  id: 'spire', name: '氷結の尖塔',
  primarySpecies: ['koorin', 'tsurataran', 'koorin'],
  altSpecies: ['shizukun', 'meramera'],
  bossSpecies: 'tsurataran', bossAddSpecies: 'koorin',
  levelBase: 21,
  treasureAttrs: ['ice', 'ice', 'water', 'fire'],
  goldBase: 35,
});
