/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const etymologyRegex = /4:(\d+),(?:1:(\d+)|(NULL))(,.+)\r\n/gm;

/**
 * Remove id from etymology file as id will be given by the position in the array.
 * Etymology file has 3 gaps but difference is 1 only (see unit tests).
 * @private
 * @const
 * @param { string } content Input etymology file content
 * @returns { string } Parsed etymology content
 */
const parseEtymology = content => {
  let pid = 0;
  return content.replace(
    etymologyRegex,
    (match, id, lexemeId, noLexemeId, line) => {
      let sb = `,t(${noLexemeId ? 'null' : lexemeId}${line.replace(
        /\\/g,
        '\\\\'
      )})`;
      const cid = parseInt(id, 10);
      if (pid + 1 !== cid) {
        sb = `,${sb}`;
      }
      pid = cid;
      return sb;
    }
  );
};

/**
 * Build etymology javascript from etymology records,
 * e.g. 4:10,1:75,"eu\310",5
 * @param { string } content Etymology file content
 * @returns { string } Etymology javascript
 */
export default content => {
  const lines = parseEtymology(content);
  return `import{getEtymology as t}from 'sedra-model';export default Object.freeze([${lines}]);`;
};
