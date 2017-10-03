/**
 * Regex to remove ids from file
 * book - Left 2 digits represent the book (52=Matt, 53=Mark, 54=Luke, etc.)
 * chapter - Next 2 digits = chapter
 * verse - Next 3 digits = verse
 * index - Next 2 digits = word
 * wordId - the two most significant bytes are always 02 which represents the database file number
 * @private
 * @const
 * @type { RegExp }
 */
const ubsRegex = /^0:-?\d+,(\d{2})(\d{2})(\d{3})(\d{2}),(\d+),.+$/;

/**
 * Get parsed word line from the ubsRegex match
 * @private
 * @const
 * @param { Object } match - regex match result
 * @returns { Object } object created from match result
 */
const getParse = match =>
  Object.freeze(
    Object.create(null, {
      book: { value: parseInt(match[1], 10), enumerable: true },
      chapter: { value: parseInt(match[2], 10), enumerable: true },
      verse: { value: parseInt(match[3], 10), enumerable: true },
      index: { value: parseInt(match[4], 10), enumerable: true },
      wordId: { value: parseInt(match[5], 10) & 0x00ffffff, enumerable: true }
    })
  );

/**
 * Remove id from ubs file as it is not being used and it
 * is also messed up - it overflows and becomes negative.
 * @private
 * @const
 * @param { string } content Input ubs file content
 * @returns { string } Parsed ubs content
 */
const parseUbs = content => {
  const map = Object.create(null);
  const lines = content.split(/\r\n/);
  for (let i = 0, len = lines.length - 1; i < len; i++) {
    const parse = getParse(ubsRegex.exec(lines[i]));
    const book =
      map[parse.book] ||
      Object.defineProperty(map, parse.book, {
        value: {},
        enumerable: true
      })[parse.book];
    const chapter =
      book[parse.chapter] ||
      Object.defineProperty(book, parse.chapter, {
        value: {},
        enumerable: true
      })[parse.chapter];
    const verse =
      chapter[parse.verse] ||
      Object.defineProperty(chapter, parse.verse, {
        value: [],
        enumerable: true
      })[parse.verse];
    verse[parse.index - 1] = parse.wordId;
  }
  return Object.freeze(map);
};

/**
 * Build ubs javascript from ubs records,
 * e.g. 0:8,520100108,33554599,36
 * @param { string } content Ubs file content
 * @returns { string } Ubs javascript
 */
export default content => {
  const parse = parseUbs(content);
  return `export default${JSON.stringify(parse).replace(/"/g, '')};`;
};
