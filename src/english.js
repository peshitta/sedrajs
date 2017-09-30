/** @module sedra */

/**
 * Regex to remove ids from file
 * @private
 * @const
 * @type { RegExp }
 */
const idRegex = /^3:\d+,(?:1:(\d+)|(NULL))/gm;

/**
 * Remove id from english file as id will be given by the position in the array.
 * @private
 * @const
 * @param { string } content Input english file content
 * @returns { string } Parsed english content
 */
const parseEnglish = content =>
  content.trim().replace(idRegex, (match, id, noId) => (noId ? 'null' : id));

/**
 * Build english javascript from english records,
 * e.g. 3:165,1:97,"cause","without","","",0,0
 * @param { string } content English file content
 * @returns { string } English javascript
 */
export default content => {
  let sb =
    "import{getEnglish as e}from 'sedra-model';export default Object.freeze([";
  const lines = parseEnglish(content).split('\r\n');
  for (let i = 0, len = lines.length; i < len; i++) {
    sb += `${i ? ',' : ''}e(${lines[i]})`;
  }
  sb += ']);';
  return sb;
};
