import { buildMap } from './mapBuilder.js';
export const EARTH_RIFT_MAP = buildMap({
  id: 'earthRift', name: '大地の裂谷',
  primarySpecies: ['tsuchinko', 'iwamushi', 'tsuchinko'],
  altSpecies: ['biribiri', 'kazaguruma'],
  bossSpecies: 'iwamushi', bossAddSpecies: 'tsuchinko',
  levelBase: 46,
  treasureAttrs: ['earth', 'earth', 'thunder', 'wind'],
  goldBase: 60,
});
