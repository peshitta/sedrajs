/** @module sedrajs */

// This stub file is used only by `jsdoc2md` to document Sedra.js database

/**
 * Array of Root objects created from Sedra 3 root records
 * @const
 * @static
 * @type { Array.<Root> }
 */
export const roots = [];

/**
 * Array of Lexeme objects created from Sedra 3 lexeme records
 * @const
 * @static
 * @type { Array.<Lexeme> }
 */
export const lexemes = [];

/**
 * Array of Word objects created from Sedra 3 word records
 * @const
 * @static
 * @type { Array.<Word> }
 */
export const words = [];

/**
 * Array of English objects created from Sedra 3 english records
 * @const
 * @static
 * @type { Array.<English> }
 */
export const english = [];

/**
 * Array of Etymology objects created from Sedra 3 etymology records
 * @const
 * @static
 * @type { Array.<Etymology> }
 */
export const etymology = [];

/**
 * A hierarchical object with books as first level keys, with chapters objects
 * under each book, then verse objects under each chapter and word id arrays as
 * leaves, referencing the actual content for each book.
 * @const
 * @static
 * @type { Object }
 */
export const ubs = {};
