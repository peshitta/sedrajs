/** @module sedra */
import { toCal } from 'sedra-cal';

/**
 * Regex to remove ids from file and call `toCal` on lexemes.
 * @private
 * @const
 * @type { RegExp }
 */
const lexemeRegex = /1:\d+,(?:0:(\d+,)|(NULL,))("[A-Z;/]+")(,.+)\r\n/gm;

/**
 * Remove id from lexeme as id will be given by the position in the JS array.
 * Covert lexeme to CAL representation.
 * @private
 * @const
 * @param { string } content Input lexeme file content
 * @returns { string } Parsed Lexeme content
 */
const parseLexemes = content =>
  content.replace(
    lexemeRegex,
    (match, id, noId, lexeme, line) =>
      `,l(${noId ? 'null,' : id}${toCal(lexeme)}${line})`
  );

/**
 * Build lexemes javascript from lexeme records,
 * e.g. 1:2,0:2,"ABA",41960448,16
 * @param { string } content Lexeme file content
 * @returns { string } Lexemes javascript
 */
export default content => {
  const lines = parseLexemes(content);
  return `import{getLexeme as l}from 'sedra-model';export default Object.freeze([${lines}]);`;
};
