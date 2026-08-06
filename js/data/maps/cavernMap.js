import { buildMap } from './mapBuilder.js';
export const CAVERN_MAP = buildMap({
  id: 'cavern', name: '溶岩の洞穴',
  primarySpecies: ['hibana', 'meramera', 'hibana'],
  altSpecies: ['iwamushi', 'biribiri'],
  bossSpecies: 'meramera', bossAddSpecies: 'iwamushi',
  levelBase: 11,
  treasureAttrs: ['fire', 'fire', 'earth', 'thunder'],
  goldBase: 25,
});
