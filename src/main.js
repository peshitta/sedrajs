/** @module sedra */
import buildRoots from './root';
import buildLexemes from './lexeme';
import buildEnglish from './english';
import * as model from './model';

export default Object.freeze(
  Object.create(null, {
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
