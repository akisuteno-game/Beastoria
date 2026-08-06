import { buildMap } from './mapBuilder.js';
export const CHAOS_RIFT_MAP = buildMap({
  id: 'chaosRift', name: '混沌の狭間',
  primarySpecies: ['utsuroi', 'kuromaru', 'terimushi'],
  altSpecies: ['biribiri', 'meramera', 'iwamushi'],
  bossSpecies: 'utsuroi', bossAddSpecies: 'kuromaru',
  levelBase: 71,
  treasureAttrs: ['void', 'dark', 'light', 'earth'],
  goldBase: 90,
});
