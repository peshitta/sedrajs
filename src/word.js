import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const wordRegex = /2:(\d+),(?:1:(\d+)|(NULL)),("[A-Z;/]+"),(".+"),(.+)\r\n/gm;

/**
 * Remove id from word file as id will be given by the position in the array.
 * Word file has 432 gaps with largest ones being 45 (see unit tests).
 * @private
 * @const
 * @param { string } content Input word file content
 * @returns { string } Parsed word content
 */
const parseWord = content => {
  let pid = 0;
  return content.replace(
    wordRegex,
    (match, id, lexemeId, noLexemeId, word, vocalised, line) => {
      const cid = parseInt(id, 10);
      let sb = '';
      while (pid < cid) {
        sb += ',';
        ++pid;
      }
      return `${sb}w(${noLexemeId ? 'null' : lexemeId},${toCal(word)},${toCal(
        vocalised
      )},${line})`;
    }
  );
};

/**
 * Build word javascript from word records,
 * e.g. 2:31070,1:2055,"DMSBRNOTA","D'aMSaB'RoNuOT,oA",6915072,128
 * @param { string } content Word file content
 * @returns { string } Word javascript
 */
export default content => {
  const lines = parseWord(content);
  return `import{getWord as w}from 'sedra-model';export default Object.freeze([${lines}]);`;
};
