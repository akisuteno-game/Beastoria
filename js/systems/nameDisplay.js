/* ============================================================
   nameDisplay.js
   表示名の合成

   instance.coreName(種族名 or 進化後の名前)に、異姙化合成で
   獲得した属性(最初の属性以外)の短い固有音を前置きして、
   instance.nameを組み立て直す。名前が長くなりすぎないよう、
   最初に獲得した2つの属性までしか名前には反映しない
   (3つ目以降はステータス・戦闘には影響するが名前は変わらない)。
   ============================================================ */

import { ATTR_NAME_PARTS } from '../data/attributeNameParts.js';

const MAX_NAMED_ATTRS = 2; // 名前に反映する追加属性の上限

export function updateDisplayName(instance) {
  // 最初の属性(=species本来の属性)以外は、異姙化合成で後から得たもの
  const gainedAttrs = instance.attributes.slice(1, 1 + MAX_NAMED_ATTRS);
  const modifier = gainedAttrs.map((a) => ATTR_NAME_PARTS[a] ?? '').join('');
  instance.name = modifier + instance.coreName;
}
