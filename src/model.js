/** @module sedra */

/**
 * Remove file id prefix from ids
 * @param { string } content Word file content
 */
export const parseWord = content =>
  content
    .replace(/^2:/gm, '')
    .replace(/,1:/gm, ',')
    .replace(/,NULL,/gm, ',null,');

/**
 * Word records, e.g. 2:8,1:2,"ABHOH;","AaB,oHaOH_;",7405716,129
 * Id is the position in the array so it is not stored
 *
 * @param { number } id e.g. 8
 * @param { number } lexemeId Lexeme Address, e.g. 2
 * @param { string } word Word, e.g. "ABHOH;"
 * @param { string } vocalised Vocalised Word, e.g. "AaB,oHaOH_;"
 * @param { number } morphologicalType 32-bit map
 * @param { number } attributes 16-bit map
 */
export const makeWord = (
  id,
  lexemeId,
  word,
  vocalised,
  morphologicalType,
  attributes
) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      lexemeId: { value: lexemeId, enumerable: true },
      word: { value: word, enumerable: true },
      vocalised: { value: vocalised, enumerable: true },
      morphologicalType: { value: morphologicalType, enumerable: true },
      attributes: { value: attributes, enumerable: true }
    })
  );

const idRegex = /^0:-?\d+,/gm;

/**
 * Remove file id prefix from ids
 * @param { string } content BFBS/UBS file content
 */
export const parseUbs = content => content.trim().replace(idRegex, '');

/**
 * UBS records, e.g. 0:381,520200807,33570564,24
 *
 * @param { number } id e.g. 2
 * @param { number } reference Word reference, e.g. 520100101
 * @param { number } wordId e.g. e.g. 33565194d
 * @param { number } parentWordId parent word id
 */
export const makeUbs = (id, reference, wordId, parentWordId) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      reference: { value: reference, enumerable: true },
      wordId: { value: wordId, enumerable: true },
      parentWordId: { value: parentWordId, enumerable: true }
    })
  );
