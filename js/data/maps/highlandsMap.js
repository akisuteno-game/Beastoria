import { buildMap } from './mapBuilder.js';
export const HIGHLANDS_MAP = buildMap({
  id: 'highlands', name: '霧の丘陵',
  primarySpecies: ['kokekko', 'happan', 'soyokaze'],
  altSpecies: ['shizukun', 'kazaguruma'],
  bossSpecies: 'happan', bossAddSpecies: 'kazaguruma',
  levelBase: 16,
  treasureAttrs: ['forest', 'water', 'wind', 'forest'],
  goldBase: 30,
});
