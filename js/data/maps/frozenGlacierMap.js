import { buildMap } from './mapBuilder.js';
export const FROZEN_GLACIER_MAP = buildMap({
  id: 'frozenGlacier', name: '極寒の氷河',
  primarySpecies: ['koorin', 'tsurataran', 'koorin'],
  altSpecies: ['soyokaze', 'mizuumi'],
  bossSpecies: 'tsurataran', bossAddSpecies: 'koorin',
  levelBase: 66,
  treasureAttrs: ['ice', 'ice', 'wind', 'water'],
  goldBase: 80,
});
