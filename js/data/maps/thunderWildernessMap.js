import { buildMap } from './mapBuilder.js';
export const THUNDER_WILDERNESS_MAP = buildMap({
  id: 'thunderWilderness', name: '雷鳴の荒野',
  primarySpecies: ['ikazuchi', 'biribiri', 'ikazuchi'],
  altSpecies: ['tsuchinko', 'koorin'],
  bossSpecies: 'biribiri', bossAddSpecies: 'ikazuchi',
  levelBase: 51,
  treasureAttrs: ['thunder', 'thunder', 'earth', 'ice'],
  goldBase: 65,
});
