import { buildMap } from './mapBuilder.js';
export const DEEP_FOREST_MAP = buildMap({
  id: 'deepForest', name: '深緑の秘境',
  primarySpecies: ['kokekko', 'happan', 'kokekko'],
  altSpecies: ['koorin', 'yamitsubo'],
  bossSpecies: 'happan', bossAddSpecies: 'kokekko',
  levelBase: 56,
  treasureAttrs: ['forest', 'forest', 'ice', 'dark'],
  goldBase: 70,
});
