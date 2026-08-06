import { buildMap } from './mapBuilder.js';
export const COVE_MAP = buildMap({
  id: 'cove', name: '水辺の入江',
  primarySpecies: ['shizukun', 'mizuumi', 'shizukun'],
  altSpecies: ['hibana', 'ikazuchi'],
  bossSpecies: 'mizuumi', bossAddSpecies: 'shizukun',
  levelBase: 6,
  treasureAttrs: ['water', 'water', 'fire', 'thunder'],
  goldBase: 20,
});
