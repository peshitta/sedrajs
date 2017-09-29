# Sedrajs - A JavaScript representation of SEDRA 3 database

[![npm version](https://badge.fury.io/js/sedrajs.svg)](https://badge.fury.io/js/sedrajs)
[![npm module downloads](http://img.shields.io/npm/dt/sedrajs.svg)](https://www.npmjs.org/package/sedrajs)
[![Build Status](https://travis-ci.org/peshitta/sedrajs.svg?branch=master)](https://travis-ci.org/peshitta/sedrajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/sedrajs/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/sedrajs.svg)](https://david-dm.org/peshitta/sedrajs)
[![devDependencies Status](https://david-dm.org/peshitta/sedrajs/dev-status.svg)](https://david-dm.org/peshitta/sedrajs?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/sedrajs/badge.svg?branch=master)](https://coveralls.io/github/peshitta/sedrajs?branch=master)

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

Sedrajs files are not available for distribution, by design. Only the 
un-modified Sedra 3 database files and the conversion scripts are packaged.
You have to run the conversion scripts, by running the command above. That will
convert Sedra 3 text database and place it in your `node_modules` folder as:
* `sedra.esm.js` - An ES6 module bundle, suitable for use in other people's
libraries and applications.
* `sedra.js` - A general UMD build, suitable for use in any environment
(Web browser, Node.js, etc.)
* `sedra.min.js` - A minified version of `sedra.js` build.

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
Thank you!

## Development

```
npm install
```
```
npm run build
```

## API Reference

* [sedra](#module_sedra)
    * [.parseRoot](#module_sedra.parseRoot)
    * [.makeRoot](#module_sedra.makeRoot)
    * [.parseLexeme](#module_sedra.parseLexeme)
    * [.makeLexeme](#module_sedra.makeLexeme)
    * [.parseWord](#module_sedra.parseWord)
    * [.makeWord](#module_sedra.makeWord)
    * [.parseEnglish](#module_sedra.parseEnglish)
    * [.makeEnglish](#module_sedra.makeEnglish)
    * [.parseEtymology](#module_sedra.parseEtymology)
    * [.makeEtymology](#module_sedra.makeEtymology)
    * [.parseUbs](#module_sedra.parseUbs)
    * [.makeUbs](#module_sedra.makeUbs)

<a name="module_sedra.parseRoot"></a>

### sedra.parseRoot
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Root file content |

<a name="module_sedra.makeRoot"></a>

### sedra.makeRoot
Root records, e.g. 0:2,"AB","ab           |A",0

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 2 |
| root | <code>string</code> | e.g. "AB" |
| sort | <code>string</code> | e.g. "ab          |A" |
| attributes | <code>number</code> | 16-bit map |

<a name="module_sedra.parseLexeme"></a>

### sedra.parseLexeme
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Lexeme file content |

<a name="module_sedra.makeLexeme"></a>

### sedra.makeLexeme
Lexeme records, e.g. 1:2,0:2,"ABA",41960448,16

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 2 |
| rootId | <code>number</code> | Root Address, e.g. 2 |
| lexeme | <code>string</code> | e.g. "ABA" |
| morphologicalType | <code>number</code> | 32-bit map |
| attributes | <code>number</code> | 16-bit map |

<a name="module_sedra.parseWord"></a>

### sedra.parseWord
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Word file content |

<a name="module_sedra.makeWord"></a>

### sedra.makeWord
Word records, e.g. 2:8,1:2,"ABHOH;","AaB,oHaOH_;",7405716,129
Id is the position in the array so it is not stored

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 8 |
| lexemeId | <code>number</code> | Lexeme Address, e.g. 2 |
| word | <code>string</code> | Word, e.g. "ABHOH;" |
| vocalised | <code>string</code> | Vocalised Word, e.g. "AaB,oHaOH_;" |
| morphologicalType | <code>number</code> | 32-bit map |
| attributes | <code>number</code> | 16-bit map |

<a name="module_sedra.parseEnglish"></a>

### sedra.parseEnglish
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | English file content |

<a name="module_sedra.makeEnglish"></a>

### sedra.makeEnglish
English meaning, e.g. 3:165,1:97,"cause","without","","",0,0

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 165 |
| lexemeId | <code>number</code> | Lexeme address, e.g. 97 |
| word | <code>string</code> | Meaning, e.g. "cause" |
| before | <code>string</code> | String before meaning, e.g. "without" (i.e. without cause) |
| after | <code>number</code> | String after meaning, e.g. "" |
| comment | <code>number</code> | Comment, e.g. "" |
| attributes | <code>number</code> | 16-bit map |
| flag | <code>number</code> | 1 bit flag |

<a name="module_sedra.parseEtymology"></a>

### sedra.parseEtymology
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | Etymology file content |

<a name="module_sedra.makeEtymology"></a>

### sedra.makeEtymology
Etymology records, e.g. 4:1,1:1,"a\255h\256r",5

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 1 |
| lexemeId | <code>number</code> | Lexeme address, e.g. 1 |
| word | <code>string</code> | Word Origin, e.g. "a\255h\256r" |
| attributes | <code>number</code> | 16-bit map |

<a name="module_sedra.parseUbs"></a>

### sedra.parseUbs
Remove file id prefix from ids

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | BFBS/UBS file content |

<a name="module_sedra.makeUbs"></a>

### sedra.makeUbs
UBS records, e.g. 0:381,520200807,33570564,24

**Kind**: static constant of [<code>sedra</code>](#module_sedra)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | e.g. 2 |
| reference | <code>number</code> | Word reference, e.g. 520100101 |
| wordId | <code>number</code> | e.g. e.g. 33565194d |
| parentWordId | <code>number</code> | parent word id |

