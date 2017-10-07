/** @module convert */
import { join } from 'path';
import { realpath, readFile, writeFile } from 'fs-extra';
import {
  getRoots,
  getLexemes,
  getWords,
  getEnglish,
  getEtymology,
  getUbs
} from 'sedra-parse';

const outDir = `${__dirname}/../`;
const throwError = error => {
  throw error;
};

/**
 * Sedra db content converter: callback to transform content read from disk.
 * @static
 * @callback converter
 * @param { string } content Sedra db text file content
 * @returns { string } Converted content
 */
/**
 * Read Sedra db file asynchronously and returns converted content promise
 * @static
 * @param { string } db Sedra text database file name
 * @param { converter } converter Content converter
 * @returns { Promise.<string> } Converted content promise
 */
const readDb = (db, converter) =>
  realpath(join(__dirname, '../../sedra', db))
    .then(file =>
      readFile(file, 'utf8')
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
  writeFile(filePath, content, 'utf8')
    .then(() => {
      realpath(filePath)
        .then(file => {
          global.console.log(`Saved '${file}'`);
        })
        .catch(throwError);
    })
    .catch(throwError);

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

/**
 * Read all of Sedra 3 text database and convert it to JavaScript
 * @static
 * @const
 * @returns { Promise } Promise for JavaScript database
 */
const convertDb = Promise.all([
  rootPromise,
  lexemePromise,
  wordPromise,
  englishPromise,
  etymologyPromise,
  ubsPromise
])
  .then(() => {
    const content = `o=${roots}m=${lexemes}d=${words}n=${english}y=${etymology}u=${ubs}`;
    const moduleHeader =
      "import{getRoot as r,getLexeme as l,getWord as w,getEnglish as e,getEtymology as t}from'sedra-model';var o,m,d,n,y,u;";
    const moduleFooter =
      'export{o as roots,m as lexemes,d as words,n as english,y as etymology,u as ubs};';
    const umdHeader =
      "!function(g,f){'object'==typeof exports&&'undefined'!=typeof module?f(exports,require('sedra-model')):'function'==typeof define&&define.amd?define(['exports','sedra-model'],f):f(g.sedrajs={},g.sedraModel)}(this,function(x,s){'use strict';var r=s.getRoots,l=s.getLexemes,w=s.getWords,e=s.getEnglish,t=s.getEtymology,o,m,d,n,y,u;";
    const umdFooter =
      "x.roots=o,x.lexemes=m,x.words=d,x.english=n,x.etymology=y,x.ubs=u,Object.defineProperty(x,'__esModule',{value:!0})});";
    const moduleFile = `${outDir}/sedra.esm.js`;
    const umdFile = `${outDir}/sedra.js`;
    return Promise.all([
      writeDb(moduleFile, `${moduleHeader}${content}${moduleFooter}`),
      writeDb(umdFile, `${umdHeader}${content}${umdFooter}`)
    ]);
  })
  .catch(throwError);

export { readDb, writeDb, convertDb };
