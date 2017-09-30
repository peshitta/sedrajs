/** @module sedra */
import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from file and call `toCal` on lexemes.
 * @private
 * @const
 * @type { RegExp }
 */
const idRegex = /^1:\d+,(?:0:(\d+)|(NULL))(,"[A-Z;/]+")/gm;

/**
 * Remove id from lexeme as id will be given by the position in the JS array.
 * Covert lexeme to CAL representation.
 * @private
 * @const
 * @param { string } content Input lexeme file content
 * @returns { string } Parsed Lexeme content
 */
const parseLexemes = content =>
  content
    .trim()
    .replace(
      idRegex,
      (match, id, noId, word) => (noId ? 'null' : id) + toCal(word)
    );

/**
 * Build lexemes javascript from lexeme records,
 * e.g. 1:2,0:2,"ABA",41960448,16
 * @param { string } content Lexeme file content
 * @returns { string } Lexemes javascript
 */
export default content => {
  let sb =
    "import{getLexeme as l}from 'sedra-model';export default Object.freeze([";
  const lines = parseLexemes(content).split('\r\n');
  for (let i = 0, len = lines.length; i < len; i++) {
    sb += `${i ? ',' : ''}l(${lines[i]})`;
  }
  sb += ']);';
  return sb;
};
