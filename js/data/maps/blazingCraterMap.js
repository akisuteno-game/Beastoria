import { buildMap } from './mapBuilder.js';
export const BLAZING_CRATER_MAP = buildMap({
  id: 'blazingCrater', name: '灼熱の火口',
  primarySpecies: ['hibana', 'meramera', 'hibana'],
  altSpecies: ['karappo', 'biribiri'],
  bossSpecies: 'meramera', bossAddSpecies: 'hibana',
  levelBase: 61,
  treasureAttrs: ['fire', 'fire', 'void', 'thunder'],
  goldBase: 75,
});
