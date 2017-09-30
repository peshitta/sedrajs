/** @module sedra */
import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const idRegex = /^0:\d+,("[A-Z;/]+")/gm;

/**
 * Remove id from roots as id will be given by the position in the JS array.
 * And call `toCal` on root.
 * @private
 * @const
 * @param { string } content Root file content
 * @returns { string } Parsed Root file
 */
const parseRoots = content =>
  content.trim().replace(idRegex, (match, word) => toCal(word));

/**
 * Build roots javascript from root records,
 * e.g. 0:2,"AB","ab           |A",0
 * @param { string } content Root file content
 * @returns { string } Roots javascript
 */
export default content => {
  let sb =
    "import{getRoot as r}from 'sedra-model';export default Object.freeze([";
  const lines = parseRoots(content).split('\r\n');
  for (let i = 0, len = lines.length; i < len; i++) {
    sb += `${i ? ',' : ''}r(${lines[i]})`;
  }
  sb += ']);';
  return sb;
};
