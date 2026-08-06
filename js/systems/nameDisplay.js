/* ============================================================
   nameDisplay.js
   表示名の合成

   instance.coreName(種族名 or 進化後の名前)に、異姙化合成で
   獲得した属性(最初の属性以外)の名前パーツを前置きして、
   instance.nameを組み立て直す。進化しても異姙化しても、
   常にこの関数を呼べば正しい名前になる。
   ============================================================ */

import { ATTR_NAME_PARTS } from '../data/attributeNameParts.js';

export function updateDisplayName(instance) {
  // 最初の属性(=species本来の属性)以外は、異姙化合成で後から得たもの
  const gainedAttrs = instance.attributes.slice(1);
  const modifier = gainedAttrs.map((a) => ATTR_NAME_PARTS[a] ?? '').join('');
  instance.name = modifier + instance.coreName;
}
