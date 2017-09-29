/** @module sedra */

/**
 * Remove file id prefix from ids
 * @param { string } content Root file content
 */
export const parseRoot = content => content.replace(/^0:/gm, '');

/**
 * Root records, e.g. 0:2,"AB","ab           |A",0
 *
 * @param { number } id e.g. 2
 * @param { string } root e.g. "AB"
 * @param { string } sort e.g. "ab          |A"
 * @param { number } attributes 16-bit map
 */
export const makeRoot = (id, root, sort, attributes) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      root: { value: root, enumerable: true },
      sort: { value: sort, enumerable: true },
      attributes: { value: attributes, enumerable: true }
    })
  );

/**
 * Remove file id prefix from ids
 * @param { string } content Lexeme file content
 */
export const parseLexeme = content =>
  content
    .replace(/^1:/gm, '')
    .replace(/,0:/gm, ',')
    .replace(/,NULL,/gm, ',null,');

/**
 * Lexeme records, e.g. 1:2,0:2,"ABA",41960448,16
 *
 * @param { number } id e.g. 2
 * @param { number } rootId Root Address, e.g. 2
 * @param { string } lexeme e.g. "ABA"
 * @param { number } morphologicalType 32-bit map
 * @param { number } attributes 16-bit map
 */
export const makeLexeme = (id, rootId, lexeme, morphologicalType, attributes) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      rootId: { value: rootId, enumerable: true },
      lexeme: { value: lexeme, enumerable: true },
      morphologicalType: { value: morphologicalType, enumerable: true },
      attributes: { value: attributes, enumerable: true }
    })
  );

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

/**
 * Remove file id prefix from ids
 * @param { string } content English file content
 */
export const parseEnglish = content =>
  content
    .replace(/^3:/gm, '')
    .replace(/,1:/gm, ',')
    .replace(/,NULL,/gm, ',null,');

/**
 * English meaning, e.g. 3:165,1:97,"cause","without","","",0,0
 *
 * @param { number } id e.g. 165
 * @param { number } lexemeId Lexeme address, e.g. 97
 * @param { string } word Meaning, e.g. "cause"
 * @param { string } before String before meaning, e.g. "without" (i.e. without cause)
 * @param { number } after String after meaning, e.g. ""
 * @param { number } comment Comment, e.g. ""
 * @param { number } attributes 16-bit map
 * @param { number } flag 1 bit flag
 */
export const makeEnglish = (
  id,
  lexemeId,
  word,
  before,
  after,
  comment,
  attributes,
  flag
) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      lexemeId: { value: lexemeId, enumerable: true },
      word: { value: word, enumerable: true },
      before: { value: before, enumerable: true },
      after: { value: after, enumerable: true },
      comment: { value: comment, enumerable: true },
      attributes: { value: attributes, enumerable: true },
      flag: { value: flag, enumerable: true }
    })
  );

/**
 * Remove file id prefix from ids
 * @param { string } content Etymology file content
 */
export const parseEtymology = content =>
  content
    .replace(/^4:/gm, '')
    .replace(/,1:/gm, ',')
    .replace(/,NULL,/gm, ',null,');

/**
 * Etymology records, e.g. 4:1,1:1,"a\255h\256r",5
 *
 * @param { number } id e.g. 1
 * @param { number } lexemeId Lexeme address, e.g. 1
 * @param { string } word Word Origin, e.g. "a\255h\256r"
 * @param { number } attributes 16-bit map
 */
export const makeEtymology = (id, lexemeId, word, attributes) =>
  Object.freeze(
    Object.create(null, {
      id: { value: id, enumerable: true },
      lexemeId: { value: lexemeId, enumerable: true },
      word: { value: word, enumerable: true },
      attributes: { value: attributes, enumerable: true }
    })
  );

/**
 * Remove file id prefix from ids
 * @param { string } content BFBS/UBS file content
 */
export const parseUbs = parseRoot;

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
