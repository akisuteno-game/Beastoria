import { buildMap } from './mapBuilder.js';
export const LIGHT_TEMPLE_MAP = buildMap({
  id: 'lightTemple', name: '光の神殿',
  primarySpecies: ['hikarimo', 'terimushi', 'hikarimo'],
  altSpecies: ['yamitsubo', 'kuromaru'],
  bossSpecies: 'terimushi', bossAddSpecies: 'hikarimo',
  levelBase: 31,
  treasureAttrs: ['light', 'light', 'dark', 'dark'],
  goldBase: 45,
});
