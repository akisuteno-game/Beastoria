import { buildMap } from './mapBuilder.js';
export const SHADOW_LABYRINTH_MAP = buildMap({
  id: 'shadowLabyrinth', name: '影の迷宮',
  primarySpecies: ['yamitsubo', 'kuromaru', 'yamitsubo'],
  altSpecies: ['hikarimo', 'terimushi'],
  bossSpecies: 'kuromaru', bossAddSpecies: 'yamitsubo',
  levelBase: 36,
  treasureAttrs: ['dark', 'dark', 'light', 'light'],
  goldBase: 50,
});
