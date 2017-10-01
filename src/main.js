/** @module sedra */
import * as path from 'path';
import * as fs from 'fs';
import buildRoots from './root';
import buildLexemes from './lexeme';
import buildEnglish from './english';
import * as model from './model';

/**
 * Sedra db text file content handler: logic to
 * transform file after being read from disk.
 * @callback contentHandler
 * @param { string } content Sedra db text file content
 */

/**
 * Read Sedra db file asynchronously and process it
 * @param { string } dbName Sedra text database file name
 * @param { contentHandler } contentHandler callback to process file content
 */
const readSedra = (dbName, contentHandler) => {
  const file = fs.realpathSync(path.join(__dirname, '../sedra', dbName));
  fs.readFile(file, 'utf8', (error, content) => {
    if (error) throw error;
    contentHandler(content);
  });
};

/**
 * Write content into given filePath asynchronously.
 * @param { string } filePath file to write content to
 * @param { string } content file content to write
 */
const writeFile = (filePath, content) => {
  fs.writeFile(filePath, content, error => {
    if (error) throw error;
    global.console.log(`\nSaved '${fs.realpathSync(filePath)}'`);
  });
};

export default Object.freeze(
  Object.create(null, {
    readSedra: { value: readSedra, enumerable: true },
    writeFile: { value: writeFile, enumerable: true },
    buildRoots: { value: buildRoots, enumerable: true },
    buildLexemes: { value: buildLexemes, enumerable: true },
    parseWord: { value: model.parseWord, enumerable: true },
    makeWord: { value: model.makeWord, enumerable: true },
    buildEnglish: { value: buildEnglish, enumerable: true },
    parseEtymology: { value: model.parseEtymology, enumerable: true },
    makeEtymology: { value: model.makeEtymology, enumerable: true },
    parseUbs: { value: model.parseUbs, enumerable: true },
    makeUbs: { value: model.makeUbs, enumerable: true }
  })
);
