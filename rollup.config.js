import buble from 'rollup-plugin-buble';
import istanbul from 'rollup-plugin-istanbul';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const isProduction = process.env.BUILD === 'production';
const isDev = process.env.BUILD === 'dev';
const banner = isProduction
  ? '/**\n' +
    '* @file Scripts to convert SEDRA 3 text database to JavaScript\n' +
    '* @version 1.0.0\n' +
    '* @author Greg Borota\n' +
    '* @copyright (c) 2017 Greg Borota.\n' +
    '*\n' +
    '* Based on SEDRA 3, copyright (c) 1996 GEORGE A. KIRAZ\n' +
    '*\n' +
    '* @license MIT\n' +
    '*\n' +
    '* The following license applies to all parts of this software except as\n' +
    '* documented below:\n' +
    '*\n' +
    '* Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
    '* of this software and associated documentation files (the "Software"), to deal\n' +
    '* in the Software without restriction, including without limitation the rights\n' +
    '* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
    '* copies of the Software, and to permit persons to whom the Software is\n' +
    '* furnished to do so, subject to the following conditions:\n' +
    '*\n' +
    '* The above copyright notice and this permission notice shall be included in\n' +
    '* all copies or substantial portions of the Software.\n' +
    '*\n' +
    '* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
    '* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
    '* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
    '* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
    '* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM\n' +
    '* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
    '* SOFTWARE.\n' +
    '*\n' +
    '* Files located in the node_modules and vendor directories are externally\n' +
    '* maintained libraries used by this software, which have their own licenses;\n' +
    '* their terms may differ from the terms above.\n' +
    '*\n' +
    '* Sedrajs contains a JavaScript representation of SEDRA 3 text database, with\n' +
    '* additional supporting JS data structures and utilities. SEDRA database portion\n' +
    '* is subject to the restrictions imposed by the authors of SEDRA 3 text database.\n' +
    '* The database was originally downloaded from <http://www.bethmardutho.org/>.\n' +
    '*\n' +
    '*       For additional information on the structure of the Database, see\n' +
    "*          G. Kiraz, `Automatic Concordance Generation of Syriac Texts',\n" +
    '*          in VI Symposium Syriacum 1992, ed. R. Lavenant, Orientalia\n' +
    '*          Christiana Analecta 247, Rome, 1994.\n' +
    '*\n' +
    '*       You are allowed to use SEDRA III for personal and academic\n' +
    '*       purposes provided that:\n' +
    '*       1. You do NOT redistribute any altered versions of the files.\n' +
    '*       2. You do NOT redistribute any files for any kind of profit.\n' +
    '*       3. You acknowledge in any publication whose results make use of\n' +
    '*          SEDRA III, by any means, using a formula similar to the\n' +
    '*          following:\n' +
    '*       "This work makes use of the Syriac Electronic Data\n' +
    '*        Retrieval Archive (SEDRA) by George A. Kiraz, distributed\n' +
    '*        by the Syriac Computing Institute."\n' +
    '*       You should also cite the paper mentioned above.\n' +
    '*\n' +
    '* See sedra/SEDRA3.DOC for additional details.' +
    '*/\n\n' +
    '// https://peshitta.github.io\n' +
    '// https://sedra.bethmardutho.org/about/fonts\n' +
    '// http://cal1.cn.huc.edu/searching/fullbrowser.html\n'
  : '';

const external = Object.keys(pkg.dependencies).concat(['path', 'util', 'fs']);
const input = 'src/main.js';
const name = 'sedrajs';
const format = 'cjs';
const globals = {
  'sedra-model': 'sedraModel'
};
const sourcemap = !isProduction;
const plugins = [resolve(), buble()];

// un-minified cjs build
const targets = [
  {
    input,
    output: [{ file: pkg.convert, format }],
    external,
    plugins: plugins.slice(0),
    name,
    globals,
    banner,
    sourcemap
  }
];

if (isProduction) {
  // Mjs ES 6 module
  targets.push({
    input,
    output: [{ file: pkg.convertMjs, format: 'es' }],
    external,
    plugins: plugins.slice(0),
    banner
  });

  plugins.push(
    uglify({
      output: {
        comments: (node, comment) => {
          const { value, type } = comment;
          return type === 'comment2' && /@license/i.test(value);
        }
      }
    })
  );

  // Minified cjs build
  targets.push({
    input,
    output: [{ file: pkg.convertMin, format }],
    external,
    plugins,
    name,
    globals,
    banner
  });
} else if (!isDev) {
  targets[0].plugins.push(
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  );
}

export default targets;
