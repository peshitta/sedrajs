# Sedra.js - A JavaScript representation of SEDRA 3 database

Sedra.js project uses [Node.js](https://nodejs.org/) scripts to convert
[Sedra 3](https://sedra.bethmardutho.org/about/resources) text file database
to a JavaScript representation. Sedra database files + supporting JS code are
stored in a single file bundle, ready to be used in other JS applications or
libraries. [CAL ASCII](http://cal1.cn.huc.edu/searching/fullbrowser.html)
transliteration is used for Aramaic words and roots. The result is stored in
`build` folder as:
* `sedra.esm.js` - An ES6 module bundle, suitable for use in other people's
libraries and applications.
* `sedra.umd.js` - A general UMD build, suitable for use in any environment
(Web browser, Node.js, etc.)
* `sedra.min.js` - A minified version of `sedra.umd.js` build.

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

## License

[MIT with restrictions for SEDRA 3 dependency](https://github.com/peshitta/sedrajs/blob/master/LICENSE)
