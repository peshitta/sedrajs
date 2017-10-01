/** @module sedra */
import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const rootRegex = /0:\d+,("[A-Z;/]+")(,.+)\r\n/gm;

/**
 * Remove id from roots as id will be given by the position in the JS array.
 * And call `toCal` on root.
 * @private
 * @const
 * @param { string } content Root file content
 * @returns { string } Parsed Root file
 */
const parseRoots = content =>
  content.replace(
    rootRegex,
    (match, root, line) => `,r(${toCal(root)}${line})`
  );

/**
 * Build roots javascript from root records,
 * e.g. 0:2,"AB","ab           |A",0
 * @param { string } content Root file content
 * @returns { string } Roots javascript
 */
export default content => {
  const lines = parseRoots(content);
  return `import{getRoot as r}from 'sedra-model';export default Object.freeze([${lines}]);`;
};
