/** @module convert */
import { join } from 'path';
import { realpath, mkdir, readFile, writeFile } from 'fs';
import {
  getRoots,
  getLexemes,
  getWords,
  getEnglish,
  getEtymology,
  getUbs
} from 'sedra-parse';

const realpathAsync = path =>
  new Promise((resolve, reject) => {
    realpath(path, 'utf8', (err, resolvedPath) => {
      if (err) {
        reject(err);
      } else {
        resolve(resolvedPath);
      }
    });
  });

const mkdirAsync = path =>
  new Promise((resolve, reject) => {
    mkdir(path, err => {
      if (err && err.code !== 'EEXIST') {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const readFileAsync = path =>
  new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const writeFileAsync = (file, data) =>
  new Promise((resolve, reject) => {
    writeFile(file, data, 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const outDir = `${__dirname}/../`;
const outSedraDir = `${outDir}sedra/`;
const throwError = error => {
  throw error;
};

/**
 * Sedra db content converter: callback to transform content read from disk.
 * @static
 * @callback converter
 * @param { string } content Sedra db text file content
 * @returns { string|object } Converted content
 */

/**
 * Read Sedra db file asynchronously and returns converted content promise
 * @static
 * @param { string } db Sedra text database file name
 * @param { converter } converter Content converter
 * @returns { Promise.<string|object> } Converted content promise
 */
const readDb = (db, converter) =>
  realpathAsync(join(__dirname, '../../sedra', db))
    .then(file =>
      readFileAsync(file)
        .then(content => converter(content))
        .catch(throwError)
    )
    .catch(throwError);

/**
 * Write content asynchronously and return promise
 * @static
 * @param { string } filePath File path to write to
 * @param { converter } content File content to save
 * @returns { Promise } File write promise
 */
const writeDb = (filePath, content) =>
  writeFileAsync(filePath, content)
    .then(() => {
      realpathAsync(filePath)
        .then(file => {
          global.console.log(`Saved '${file}'`);
        })
        .catch(throwError);
    })
    .catch(throwError);

/**
 * Read all of Sedra 3 text database and convert it to JavaScript
 * @static
 * @const
 * @returns { Promise } Promise for JavaScript database
 */
const convertDb = () => {
  let roots = null;
  let lexemes = null;
  let words = null;
  let english = null;
  let etymology = null;
  let ubs = null;
  const rootPromise = readDb('ROOTS.TXT', getRoots).then(js => {
    roots = js;
  });
  const lexemePromise = readDb('LEXEMES.TXT', getLexemes).then(js => {
    lexemes = js;
  });
  const wordPromise = readDb('WORDS.TXT', getWords).then(js => {
    words = js;
  });
  const englishPromise = readDb('ENGLISH.TXT', getEnglish).then(js => {
    english = js;
  });
  const etymologyPromise = readDb('ETIMOLGY.TXT', getEtymology).then(js => {
    etymology = js;
  });
  const ubsPromise = readDb('BFBS.TXT', getUbs).then(js => {
    ubs = js;
  });

  return Promise.all([
    rootPromise,
    lexemePromise,
    wordPromise,
    englishPromise,
    etymologyPromise,
    ubsPromise,
    mkdirAsync(outSedraDir)
  ])
    .then(() => {
      const rootContent = `o=${roots}`;
      const lexemeContent = `m=${lexemes}`;
      const wordContent = `d=${words.words}`;
      const englishContent = `n=${english}`;
      const etymologyContent = `y=${etymology}`;
      const ubsContent = `u=${ubs.ubs}`;
      const content = `${rootContent}${lexemeContent}${wordContent}${englishContent}${etymologyContent}${ubsContent}`;

      const rootImport = 'makeRoot as r';
      const lexemeImport = 'makeLexeme as l';
      const wordImport = 'makeWord as w';
      const englishImport = 'makeEnglish as e';
      const etymologyImport = 'makeEtymology as t';
      const importText = 'import{';
      const fromText = "}from'sedra-model'";
      const o = 'o';
      const m = 'm';
      const d = 'd';
      const n = 'n';
      const y = 'y';
      const u = 'u';
      const rootExport = `${o} as roots`;
      const lexemeExport = `${m} as lexemes`;
      const wordExport = `${d} as words`;
      const englishExport = `${n} as english`;
      const etymologyExport = `${y} as etymology`;
      const ubsExport = `${u} as ubs`;
      const exportText = 'export{';

      const rootHeader = `${importText}${rootImport}${fromText};export default `;
      const lexemeHeader = `${importText}${lexemeImport}${fromText};export default `;
      const wordHeader = `${importText}${wordImport}${fromText};export default `;
      const englishHeader = `${importText}${englishImport}${fromText};export default `;
      const etymologyHeader = `${importText}${etymologyImport}${fromText};export default `;
      const defaultExport = 'export default ';
      const moduleHeader = `${importText}${rootImport},${lexemeImport},${wordImport},${englishImport},${etymologyImport}${fromText};var ${o},${m},${d},${n},${y},${u};`;

      const moduleFooter = `${exportText}${rootExport},${lexemeExport},${wordExport},${englishExport},${etymologyExport},${ubsExport}};`;
      const umdHeader =
        "!function(g,f){'object'==typeof exports&&'undefined'!=typeof module?f(exports,require('sedra-model')):'function'==typeof define&&define.amd?define(['exports','sedra-model'],f):f(g.sedrajs={},g.sedraModel)}(this,function(x,s){'use strict';var r=s.makeRoot,l=s.makeLexeme,w=s.makeWord,e=s.makeEnglish,t=s.makeEtymology,o,m,d,n,y,u;";
      const umdFooter =
        "x.roots=o,x.lexemes=m,x.words=d,x.english=n,x.etymology=y,x.ubs=u,Object.defineProperty(x,'__esModule',{value:!0})});";

      const rootFile = `${outSedraDir}roots.js`;
      const lexemeFile = `${outSedraDir}lexemes.js`;
      const wordFile = `${outSedraDir}words.js`;
      const englishFile = `${outSedraDir}english.js`;
      const etymologyFile = `${outSedraDir}etymology.js`;
      const ubsFile = `${outSedraDir}ubs.js`;
      const noWFile = `${outSedraDir}noW.js`;
      const noYFile = `${outSedraDir}noY.js`;
      const referenceFile = `${outSedraDir}ubsReference.js`;

      const moduleFile = `${outDir}sedrajs.esm.js`;
      const umdFile = `${outDir}sedrajs.js`;

      return Promise.all([
        writeDb(rootFile, `${rootHeader}${roots}`),
        writeDb(lexemeFile, `${lexemeHeader}${lexemes}`),
        writeDb(wordFile, `${wordHeader}${words.words}`),
        writeDb(englishFile, `${englishHeader}${english}`),
        writeDb(etymologyFile, `${etymologyHeader}${etymology}`),
        writeDb(ubsFile, `${defaultExport}${ubs.ubs}`),
        writeDb(noWFile, `${defaultExport}${words.noW}`),
        writeDb(noYFile, `${defaultExport}${words.noY}`),
        writeDb(referenceFile, `${defaultExport}${ubs.reference}`),

        writeDb(moduleFile, `${moduleHeader}${content}${moduleFooter}`),
        writeDb(umdFile, `${umdHeader}${content}${umdFooter}`)
      ]);
    })
    .catch(throwError);
};

export { readDb, writeDb, convertDb, mkdirAsync as mkDir };
