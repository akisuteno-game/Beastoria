import { buildMap } from './mapBuilder.js';
export const VOID_SPACE_MAP = buildMap({
  id: 'voidSpace', name: '無の空間',
  primarySpecies: ['karappo', 'utsuroi', 'karappo'],
  altSpecies: ['kuromaru', 'terimushi'],
  bossSpecies: 'utsuroi', bossAddSpecies: 'karappo',
  levelBase: 41,
  treasureAttrs: ['void', 'void', 'dark', 'light'],
  goldBase: 55,
});
