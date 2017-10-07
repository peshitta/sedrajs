const test = require('assert');
const { readDb, writeDb, convertDb } = require('../build/convert/convert.js');

describe('Root', () => {
  it('Db has no id holes', done => {
    const idRegex = /^0:(\d+),.+$/gm;
    readDb('ROOTS.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('Lexeme', () => {
  it('Db has no id holes', done => {
    const idRegex = /^1:(\d+),.+$/gm;
    readDb('LEXEMES.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('Word', () => {
  it('Db HAS id holes', done => {
    const idRegex = /^2:(\d+),.+$/gm;
    readDb('WORDS.TXT', content => {
      const unsortedIds = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n')
        .map(id => parseInt(id, 10));
      const ids = unsortedIds.slice(0).sort((a, b) => a - b);
      let holeCount = 0;
      let holeSize = 0;
      let maxHole = 0;
      const len = ids.length;
      for (let i = 0, j = 0; i < len; i++) {
        const id = ids[i];
        test.strictEqual(id, unsortedIds[i], 'ids are sorted');
        if (id !== j + 1) {
          ++holeCount;
          const hole = id - j - 1;
          holeSize += hole;
          j = id;
          if (hole > maxHole) {
            maxHole = hole;
          }
        } else {
          ++j;
        }
      }
      const discrepancy = ids[len - 1] - len;
      test.strictEqual(holeCount, 432, 'number of holes');
      test.strictEqual(maxHole, 45, 'max id hole');
      test.strictEqual(discrepancy, 1380, 'id discrepancy size');
      test.strictEqual(holeSize, discrepancy, 'holes cumulative size');
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('English', () => {
  it('Db has no id holes', done => {
    const idRegex = /^3:(\d+),.+$/gm;
    readDb('ENGLISH.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('Etymology', () => {
  it('Db HAS id holes', done => {
    const idRegex = /^4:(\d+),.+$/gm;
    readDb('ETIMOLGY.TXT', content => {
      const unsortedIds = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n')
        .map(id => parseInt(id, 10));
      const ids = unsortedIds.slice(0).sort((a, b) => a - b);
      let holeCount = 0;
      let holeSize = 0;
      let maxHole = 0;
      const len = ids.length;
      for (let i = 0, j = 0; i < len; i++) {
        const id = ids[i];
        test.strictEqual(id, unsortedIds[i], 'ids are sorted');
        if (id !== j + 1) {
          ++holeCount;
          const hole = id - j - 1;
          holeSize += hole;
          j = id;
          if (hole > maxHole) {
            maxHole = hole;
          }
        } else {
          ++j;
        }
      }
      const discrepancy = ids[len - 1] - len;
      test.strictEqual(holeCount, 3, 'number of holes');
      test.strictEqual(maxHole, 1, 'max id hole');
      test.strictEqual(discrepancy, 3, 'id discrepancy size');
      test.strictEqual(holeSize, discrepancy, 'holes cumulative size');
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('Etymology', () => {
  it('Db HAS id holes', done => {
    const idRegex = /^4:(\d+),.+$/gm;
    readDb('ETIMOLGY.TXT', content => {
      const unsortedIds = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n')
        .map(id => parseInt(id, 10));
      const ids = unsortedIds.slice(0).sort((a, b) => a - b);
      let holeCount = 0;
      let holeSize = 0;
      let maxHole = 0;
      const len = ids.length;
      for (let i = 0, j = 0; i < len; i++) {
        const id = ids[i];
        test.strictEqual(id, unsortedIds[i], 'ids are sorted');
        if (id !== j + 1) {
          ++holeCount;
          const hole = id - j - 1;
          holeSize += hole;
          j = id;
          if (hole > maxHole) {
            maxHole = hole;
          }
        } else {
          ++j;
        }
      }
      const discrepancy = ids[len - 1] - len;
      test.strictEqual(holeCount, 3, 'number of holes');
      test.strictEqual(maxHole, 1, 'max id hole');
      test.strictEqual(discrepancy, 3, 'id discrepancy size');
      test.strictEqual(holeSize, discrepancy, 'holes cumulative size');
    })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });
});

describe('Sedra', () => {
  it('Parse full DB', done => {
    convertDb.then(() => done()).catch(error => {
      throw error;
    });
  });
});

describe('readDb', () => {
  it('Throws on non-existent file', done => {
    readDb('Non-Existent$<!', null).catch(() => {
      done();
    });
  });
});

describe('writeDb', () => {
  it('Throws on invalid file name', done => {
    writeDb('Inv/al\\id:Name!<>"', null).catch(() => {
      done();
    });
  });
});
