import { buildMap } from './mapBuilder.js';
export const FOREST_MAP = buildMap({
  id: 'forest', name: '森の遺跡',
  primarySpecies: ['kokekko', 'happan', 'kokekko'],
  altSpecies: ['hibana', 'shizukun'],
  bossSpecies: 'iwamushi', bossAddSpecies: 'kokekko',
  levelBase: 1,
  treasureAttrs: ['forest', 'forest', 'fire', 'water'],
  goldBase: 15,
});
