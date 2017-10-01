/** @module sedra */

/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const englishRegex = /3:\d+,(?:1:(\d+)|(NULL))(,.+)\r\n/gm;

/**
 * Remove id from english file as id will be given by the position in the array.
 * @private
 * @const
 * @param { string } content Input english file content
 * @returns { string } Parsed english content
 */
const parseEnglish = content =>
  content.replace(
    englishRegex,
    (match, id, noId, line) => `,e(${noId ? 'null' : id}${line})`
  );

/**
 * Build english javascript from english records,
 * e.g. 3:165,1:97,"cause","without","","",0,0
 * @param { string } content English file content
 * @returns { string } English javascript
 */
export default content => {
  const lines = parseEnglish(content);
  return `import{getEnglish as e}from 'sedra-model';export default Object.freeze([${lines}]);`;
};
