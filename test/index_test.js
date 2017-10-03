const test = require('assert');
const sut = require('../build/sedrajs');

describe('Root', () => {
  it('Db has no id holes', done => {
    const idRegex = /^0:(\d+),.+$/gm;
    sut.readSedra('ROOTS.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
      done();
    });
  });
  it('Build Root Javascript', () => {
    const js = sut.buildRoots(
      '0:40,"AONGL;ON","afncljfn     |0",0\r\n' +
        '0:41,"AON;XA","afnjsa       |0",0\r\n' +
        '0:42,"AO/RA","art          |0",2\r\n' +
        '0:43,"AOX;NA","asn          |0",4\r\n' +
        '0:44,"AORBNOS","aftbnfo      |0",0\r\n' +
        '0:45,"AORDEA","atdp         |0",2\r\n' +
        '0:46,"AOROS","ato          |0",4\r\n'
    );
    const expected =
      "import{getRoot as r}from 'sedra-model';export default Object.freeze([," +
      'r(")wnglywn","afncljfn     |0",0),' +
      'r(")wnyq)","afnjsa       |0",0),' +
      'r(")wcr)","art          |0",2),' +
      'r(")wqyn)","asn          |0",4),' +
      'r(")wrbnws","aftbnfo      |0",0),' +
      'r(")wrd()","atdp         |0",2),' +
      'r(")wrws","ato          |0",4)]);';
    test.strictEqual(js, expected, 'parsed file');
  });
});

describe('Lexeme', () => {
  it('Db has no id holes', done => {
    const idRegex = /^1:(\d+),.+$/gm;
    sut.readSedra('LEXEMES.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
      done();
    });
  });
  it('Build Lexeme Javascript', () => {
    const file = sut.buildLexemes(
      '1:124,0:93,"ACI",0,0\r\n' +
        '1:125,0:94,"ACRA",0,16\r\n' +
        '1:126,0:95,"ACTA",0,16\r\n' +
        '1:127,0:96,"ALA",0,100\r\n' +
        '1:128,0:97,"ALA",0,0\r\n' +
        '1:129,0:97,"AL;A",339741696,16\r\n' +
        '1:130,0:98,"ALHA",75514880,16\r\n' +
        '1:131,0:98,"ALHOTA",75514944,16\r\n' +
        '1:132,0:98,"ALH;A",75514882,32\r\n' +
        '1:133,0:98,"ALHTA",75514882,16\r\n' +
        '1:134,0:99,"ALO",0,36\r\n' +
        '1:849,NULL,"ZDXA",339740672,32\r\n' +
        '1:135,0:100,"ALOMOS",0,24\r\n'
    );
    const parsedfile =
      "import{getLexeme as l}from 'sedra-model';export default Object.freeze([," +
      'l(93,")kp",0,0),' +
      'l(94,")kr)",0,16),' +
      'l(95,")kt)",0,16),' +
      'l(96,")l)",0,100),' +
      'l(97,")l)",0,0),' +
      'l(97,")ly)",339741696,16),' +
      'l(98,")lh)",75514880,16),' +
      'l(98,")lhwt)",75514944,16),' +
      'l(98,")lhy)",75514882,32),' +
      'l(98,")lht)",75514882,16),' +
      'l(99,")lw",0,36),' +
      'l(null,"zdq)",339740672,32),' +
      'l(100,")lwmws",0,24)]);';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Word', () => {
  it('Db HAS id holes', done => {
    const idRegex = /^2:(\d+),.+$/gm;
    sut.readSedra('WORDS.TXT', content => {
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
      done();
    });
  });
  it('Build Word Javascript', () => {
    const file = sut.buildWords(
      '2:1,1:2,"LABOH","LaAB,uOH",6883480,128\r\n' +
        '2:2,1:2,"LABOH;","LaAB,uOH_;",6883476,128\r\n' +
        '2:3,1:2,"LABOH;N","LaAB,uOHe;N",6883544,128\r\n' +
        '2:7,1:2,"LABOC","LaAB,uOC,",6883492,128\r\n' +
        '2:8,1:2,"LABOCON","LaAB,uOC,uON",6883556,128\r\n' +
        '2:9,NULL,"LABON","LaAB,uON",6883568,128\r\n' +
        '2:10,1:2,"LAB;","LoAB,;",6883504,128\r\n' +
        '2:11,1:3,"ABHOTA","AaB,oHuOT,oA",6914048,192\r\n' +
        '2:13,1:4,"ABHON","AeB\'HuON",6881492,128\r\n' +
        '2:14,1:4,"OABC;","OeAB\'eC,;",6882984,128\r\n' +
        '2:15,1:4,"ABA","AeB\'oA",6881280,320\r\n' +
        '2:20,1:5,"ABD","AoB,eD,",109772800,128\r\n'
    );
    const parsedfile =
      "import{getWord as w}from 'sedra-model';export default Object.freeze([," +
      'w(2,"l)bwh","la)b,wuh",6883480,128),' +
      'w(2,"l)bwhy","la)b,wuh_y",6883476,128),' +
      'w(2,"l)bwhyn","la)b,wuheyn",6883544,128),' +
      ',,,' +
      'w(2,"l)bwk","la)b,wuk,",6883492,128),' +
      'w(2,"l)bwkwn","la)b,wuk,wun",6883556,128),' +
      'w(null,"l)bwn","la)b,wun",6883568,128),' +
      'w(2,"l)by","lo)b,y",6883504,128),' +
      'w(3,")bhwt)",")ab,ohwut,o)",6914048,192),' +
      ',' +
      'w(4,")bhwn",")eb\'hwun",6881492,128),' +
      'w(4,"w)bky","we)b\'ek,y",6882984,128),' +
      'w(4,")b)",")eb\'o)",6881280,320),' +
      ',,,,' +
      'w(5,")bd",")ob,ed,",109772800,128)' +
      ']);';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('English', () => {
  it('Db has no id holes', done => {
    const idRegex = /^3:(\d+),.+$/gm;
    sut.readSedra('ENGLISH.TXT', content => {
      const ids = content
        .trim()
        .replace(idRegex, (match, id) => id)
        .split('\r\n');
      for (let i = 0, len = ids.length; i < len; i++) {
        test.strictEqual(ids[i], (i + 1).toString(), 'id mismatch');
      }
      done();
    });
  });
  it('Parse English File', () => {
    const file = sut.buildEnglish(
      '3:15,NULL,"perishing","","","",0,0\r\n' +
        '3:16,1:8,"pipe","","","",0,0\r\n' +
        '3:17,1:8,"flute","","","",0,0\r\n' +
        '3:18,1:9,"Abijah","","","(son of Rehoboam)",2,0\r\n' +
        '3:19,1:10,"Abijah","","","(founder of a course of priests)",2,0\r\n' +
        '3:20,1:11,"Abiud","","","",0,0\r\n' +
        '3:21,1:12,"Abilene","","","",0,0\r\n' +
        '3:22,1:13,"Abiathar","","","",0,0\r\n' +
        '3:23,1:14,"mourner","","","",0,0\r\n' +
        '3:24,1:15,"grieve","","","",4096,0\r\n' +
        '3:25,1:15,"mourn","","","",4096,0\r\n' +
        '3:26,1:16,"mourning","","","",0,0\r\n' +
        '3:27,1:16,"grief","","","",0,0\r\n' +
        '3:28,1:16,"sadness","","","",0,0\r\n' +
        '3:29,1:17,"stone","","","",0,0\r\n' +
        '3:30,1:18,"Abraham","","","",0,0\r\n' +
        '3:31,NULL,"Abram","","","",0,0\r\n'
    );
    const parsedfile =
      "import{getEnglish as e}from 'sedra-model';export default Object.freeze([," +
      'e(null,"perishing","","","",0,0),' +
      'e(8,"pipe","","","",0,0),' +
      'e(8,"flute","","","",0,0),' +
      'e(9,"Abijah","","","(son of Rehoboam)",2,0),' +
      'e(10,"Abijah","","","(founder of a course of priests)",2,0),' +
      'e(11,"Abiud","","","",0,0),' +
      'e(12,"Abilene","","","",0,0),' +
      'e(13,"Abiathar","","","",0,0),' +
      'e(14,"mourner","","","",0,0),' +
      'e(15,"grieve","","","",4096,0),' +
      'e(15,"mourn","","","",4096,0),' +
      'e(16,"mourning","","","",0,0),' +
      'e(16,"grief","","","",0,0),' +
      'e(16,"sadness","","","",0,0),' +
      'e(17,"stone","","","",0,0),' +
      'e(18,"Abraham","","","",0,0),' +
      'e(null,"Abram","","","",0,0)]);';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Etymology', () => {
  it('Db HAS id holes', done => {
    const idRegex = /^4:(\d+),.+$/gm;
    sut.readSedra('ETIMOLGY.TXT', content => {
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
      done();
    });
  });
  it('Parse Etymology File', () => {
    const file = sut.buildEtymology(
      '4:1,1:1,"a\\255h\\256r",5\r\n' +
        '4:2,1:20,"a\\255gc\\256n",5\r\n' +
        '4:3,1:22,"a\\255gro\\256w",5\r\n' +
        '4:4,1:36,"ei\\310dow",5\r\n' +
        '4:5,1:46,"eu\\255jaristi\\256a",5\r\n' +
        '4:6,1:50,"eu\\255agge\\256lion",5\r\n' +
        '4:7,1:53,"o\\261gkinow",5\r\n' +
        '4:8,1:57,"eu\\255roklu\\256dcn",5\r\n' +
        '4:9,1:61,"64.000000",6\r\n' +
        '4:10,1:75,"eu\\310",5\r\n' +
        '4:11,1:77,"86.000000",8\r\n' +
        '4:12,1:1797,"me\\256n",5\r\n' +
        '4:13,1:97,"ei\\255k\\224\\264",5\r\n' +
        '4:14,1:106,"e\\261jidna",5\r\n' +
        '4:15,1:119,"o\\261jlow",5\r\n' +
        '4:16,1:122,"xe\\256now",5\r\n' +
        '4:17,1:161,"a\\255me\\256yustow",5\r\n' +
        '4:19,1:191,"a\\255na\\256gkh",5\r\n' +
        '4:20,1:198,"a\\255nyu\\256patow",5\r\n' +
        '4:21,NULL,"409.000000",8\r\n' +
        '4:22,1:859,"zeu\\264gos",5\r\n'
    );
    const parsedfile =
      "import{getEtymology as t}from 'sedra-model';export default Object.freeze([," +
      't(1,"a\\\\255h\\\\256r",5),' +
      't(20,"a\\\\255gc\\\\256n",5),' +
      't(22,"a\\\\255gro\\\\256w",5),' +
      't(36,"ei\\\\310dow",5),' +
      't(46,"eu\\\\255jaristi\\\\256a",5),' +
      't(50,"eu\\\\255agge\\\\256lion",5),' +
      't(53,"o\\\\261gkinow",5),' +
      't(57,"eu\\\\255roklu\\\\256dcn",5),' +
      't(61,"64.000000",6),' +
      't(75,"eu\\\\310",5),' +
      't(77,"86.000000",8),' +
      't(1797,"me\\\\256n",5),' +
      't(97,"ei\\\\255k\\\\224\\\\264",5),' +
      't(106,"e\\\\261jidna",5),' +
      't(119,"o\\\\261jlow",5),' +
      't(122,"xe\\\\256now",5),' +
      't(161,"a\\\\255me\\\\256yustow",5),' +
      ',' +
      't(191,"a\\\\255na\\\\256gkh",5),' +
      't(198,"a\\\\255nyu\\\\256patow",5),' +
      't(null,"409.000000",8),' +
      't(859,"zeu\\\\264gos",5)' +
      ']);';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('BFBS/UBS', () => {
  it('Parse BFBS/UBS File', () => {
    const file = sut.buildUbs(
      '0:1,520100101,33565194,64\r\n' +
        '0:2,520100102,33563576,0\r\n' +
        '0:3,520100103,33564000,0\r\n' +
        '0:4,520100104,33566955,16\r\n' +
        '0:5,520100105,33557677,0\r\n' +
        '0:6,520100106,33558659,24\r\n' +
        '0:7,520100107,33557677,0\r\n' +
        '0:8,520100108,33554599,36\r\n' +
        '0:9,520100201,33554597,0\r\n' +
        '0:-32628,541601508,33567919,0\r\n' +
        '0:-32627,541601509,33572533,0\r\n' +
        '0:-32626,541601510,33557662,-28672\r\n' +
        '0:-32625,541601511,33555860,4100\r\n' +
        '0:-32624,541601512,33555337,0\r\n' +
        '0:-32623,541601513,33558837,0\r\n' +
        '0:-32622,541601514,33563118,0\r\n' +
        '0:-32621,541601515,33565392,-32764\r\n' +
        '0:-32620,541601516,33565838,0\r\n' +
        '0:-32619,541601517,33574171,0\r\n' +
        '0:-32618,541601518,33557095,0\r\n' +
        '0:-32617,541601519,33555871,-32752\r\n'
    );
    const parsedfile =
      'export default{52:{1:{1:[10762,9144,9568,12523,3245,4227,3245,167],2:[165]}},54:{16:{15:[null,null,null,null,null,null,null,13487,18101,3230,1428,905,4405,8686,10960,11406,19739,2663,1439]}}};';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});
