# Sedrajs - A JavaScript representation of SEDRA 3 database

[![npm version](https://badge.fury.io/js/sedrajs.svg)](https://badge.fury.io/js/sedrajs)
[![npm module downloads](http://img.shields.io/npm/dt/sedrajs.svg)](https://www.npmjs.org/package/sedrajs)
[![Build Status](https://travis-ci.org/peshitta/sedrajs.svg?branch=master)](https://travis-ci.org/peshitta/sedrajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/sedrajs/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/sedrajs.svg)](https://david-dm.org/peshitta/sedrajs)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/sedrajs/badge.svg?branch=master)](https://coveralls.io/github/peshitta/sedrajs?branch=master)
[![Gitter](https://badges.gitter.im/peshitta/peshitta.svg "Join the chat at https://gitter.im/peshitta/Lobby")](https://gitter.im/peshitta/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Sedrajs project uses [Node.js](https://nodejs.org/) scripts to convert
[Sedra 3](https://sedra.bethmardutho.org/about/resources) text file database
to a JavaScript representation.
[CAL ASCII](http://cal1.cn.huc.edu/searching/fullbrowser.html) transliteration
is used for Aramaic words and roots.

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install sedrajs --save
```

Sedrajs JS database files are not available for distribution, by design.
Only the un-modified Sedra 3 database files and the conversion scripts are
packaged. You have to run the conversion scripts, by running the command above.
That will convert Sedra 3 text database and place it in your `node_modules`
folder as:
* `sedrajs.esm.js` - An ES6 module, suitable for use with module bundlers like
`rollup` or `webpack`.
* `sedrajs.js` - A general UMD bundle, suitable for use in any environment
(Web browser, Node.js, etc.)
* `sedra` folder - `roots.js`, `lexemes.js`, `words.js`, `english.js`
`etymology.js` and `ubs.js` separated ES6 modules.

The conversion scripts are stored in `build/convert` directory as:
* `convert.js` - Un-minified cjs node script.
* `convert.min.js` - Minified cjs node script
* `convert.mjs` - ES6 mjs node script - can be run with Node.js 8 and higher

The conversion script package could also be downloaded directly from:
[https://registry.npmjs.org/sedrajs/-/sedrajs-1.2.5.tgz](https://registry.npmjs.org/sedrajs/-/sedrajs-1.2.5.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT with restrictions](https://github.com/peshitta/sedrajs/blob/master/LICENSE)

Conversion scripts are covered by MIT license. But the SEDRA 3 database use is
restricted according to the terms mentioned below:
```
        For additional information on the structure of the Database, see
           G. Kiraz, `Automatic Concordance Generation of Syriac Texts',
           in VI Symposium Syriacum 1992, ed. R. Lavenant, Orientalia
           Christiana Analecta 247, Rome, 1994.

        You are allowed to use SEDRA III for personal and academic
        purposes provided that:
        1. You do NOT redistribute any altered versions of the files.
        2. You do NOT redistribute any files for any kind of profit.
        3. You acknowledge in any publication whose results make use of
           SEDRA III, by any means, using a formula similar to the
           following:
          "This work makes use of the Syriac Electronic Data
           Retrieval Archive (SEDRA) by George A. Kiraz, distributed
           by the Syriac Computing Institute."
           You should also cite the paper mentioned above.
```

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/sedrajs/issues).

To read quick updates about Peshitta app or post questions or feedback, follow
[@peshittap](https://www.twitter.com/peshittap)
at [![@peshittap](http://i.imgur.com/wWzX9uB.png "@peshittap")](https://www.twitter.com/peshittap)or
[![Gitter](https://badges.gitter.im/peshitta/peshitta.svg "Join the chat at https://gitter.im/peshitta/Lobby")](https://gitter.im/peshitta/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Development

```
npm install
```
```
npm run build
```

## Sedra.js API Reference

For the structure of `Root`, `Lexeme`, `Word`, `English` and `Etymology` types
see [Sedra Model](https://github.com/peshitta/sedra-model/blob/master/README.md)


* [sedrajs](#module_sedrajs)
    * [.roots](#module_sedrajs.roots) : <code>Array.&lt;Root&gt;</code>
    * [.lexemes](#module_sedrajs.lexemes) : <code>Array.&lt;Lexeme&gt;</code>
    * [.words](#module_sedrajs.words) : <code>Array.&lt;Word&gt;</code>
    * [.english](#module_sedrajs.english) : <code>Array.&lt;English&gt;</code>
    * [.etymology](#module_sedrajs.etymology) : <code>Array.&lt;Etymology&gt;</code>
    * [.ubs](#module_sedrajs.ubs) : <code>Object</code>

<a name="module_sedrajs.roots"></a>

### sedrajs.roots : <code>Array.&lt;Root&gt;</code>
Array of Root objects created from Sedra 3 root records

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  
<a name="module_sedrajs.lexemes"></a>

### sedrajs.lexemes : <code>Array.&lt;Lexeme&gt;</code>
Array of Lexeme objects created from Sedra 3 lexeme records

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  
<a name="module_sedrajs.words"></a>

### sedrajs.words : <code>Array.&lt;Word&gt;</code>
Array of Word objects created from Sedra 3 word records

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  
<a name="module_sedrajs.english"></a>

### sedrajs.english : <code>Array.&lt;English&gt;</code>
Array of English objects created from Sedra 3 english records

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  
<a name="module_sedrajs.etymology"></a>

### sedrajs.etymology : <code>Array.&lt;Etymology&gt;</code>
Array of Etymology objects created from Sedra 3 etymology records

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  
<a name="module_sedrajs.ubs"></a>

### sedrajs.ubs : <code>Object</code>
A hierarchical object with books as first level keys, with chapters objects
under each book, then verse objects under each chapter and word id arrays as
leaves, referencing the actual content for each book.

**Kind**: static constant of [<code>sedrajs</code>](#module_sedrajs)  

## Conversion script API

* [convert](#module_convert)
    * [.convertDb](#module_convert.convertDb) ⇒ <code>Promise</code>
    * [.readDb(db, converter)](#module_convert.readDb) ⇒ <code>Promise.&lt;(string\|object)&gt;</code>
    * [.writeDb(filePath, content)](#module_convert.writeDb) ⇒ <code>Promise</code>
    * [.converter](#module_convert.converter) ⇒ <code>string</code> \| <code>object</code>

<a name="module_convert.convertDb"></a>

### convert.convertDb ⇒ <code>Promise</code>
Read all of Sedra 3 text database and convert it to JavaScript

**Kind**: static constant of [<code>convert</code>](#module_convert)  
**Returns**: <code>Promise</code> - Promise for JavaScript database  
<a name="module_convert.readDb"></a>

### convert.readDb(db, converter) ⇒ <code>Promise.&lt;(string\|object)&gt;</code>
Read Sedra db file asynchronously and returns converted content promise

**Kind**: static method of [<code>convert</code>](#module_convert)  
**Returns**: <code>Promise.&lt;(string\|object)&gt;</code> - Converted content promise  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>string</code> | Sedra text database file name |
| converter | <code>converter</code> | Content converter |

<a name="module_convert.writeDb"></a>

### convert.writeDb(filePath, content) ⇒ <code>Promise</code>
Write content asynchronously and return promise

**Kind**: static method of [<code>convert</code>](#module_convert)  
**Returns**: <code>Promise</code> - File write promise  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | File path to write to |
| content | <code>converter</code> | File content to save |

<a name="module_convert.converter"></a>

### convert.converter ⇒ <code>string</code> \| <code>object</code>
Sedra db content converter: callback to transform content read from disk.

**Kind**: static typedef of [<code>convert</code>](#module_convert)  
**Returns**: <code>string</code> \| <code>object</code> - Converted content  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Sedra db text file content |

