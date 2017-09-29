const test = require('assert');
const sut = require('../build/sedrajs');

describe('Root', () => {
  it('Parse Root File', () => {
    const file = sut.parseRoot(
      '0:40,"AONGL;ON","afncljfn     |0",0\r\n' +
        '0:41,"AON;XA","afnjsa       |0",0\r\n' +
        '0:42,"AO/RA","art          |0",2\r\n' +
        '0:43,"AOX;NA","asn          |0",4\r\n' +
        '0:44,"AORBNOS","aftbnfo      |0",0\r\n' +
        '0:45,"AORDEA","atdp         |0",2\r\n' +
        '0:46,"AOROS","ato          |0",4\r\n'
    );
    const parsedfile =
      '40,"AONGL;ON","afncljfn     |0",0\r\n' +
      '41,"AON;XA","afnjsa       |0",0\r\n' +
      '42,"AO/RA","art          |0",2\r\n' +
      '43,"AOX;NA","asn          |0",4\r\n' +
      '44,"AORBNOS","aftbnfo      |0",0\r\n' +
      '45,"AORDEA","atdp         |0",2\r\n' +
      '46,"AOROS","ato          |0",4\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Lexeme', () => {
  it('Parse Lexeme File', () => {
    const file = sut.parseLexeme(
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
        '1:135,0:100,"ALOMOS",0,24\r\n'
    );
    const parsedfile =
      '124,93,"ACI",0,0\r\n' +
      '125,94,"ACRA",0,16\r\n' +
      '126,95,"ACTA",0,16\r\n' +
      '127,96,"ALA",0,100\r\n' +
      '128,97,"ALA",0,0\r\n' +
      '129,97,"AL;A",339741696,16\r\n' +
      '130,98,"ALHA",75514880,16\r\n' +
      '131,98,"ALHOTA",75514944,16\r\n' +
      '132,98,"ALH;A",75514882,32\r\n' +
      '133,98,"ALHTA",75514882,16\r\n' +
      '134,99,"ALO",0,36\r\n' +
      '135,100,"ALOMOS",0,24\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Word', () => {
  it('Parse Word File', () => {
    const file = sut.parseWord(
      '2:59,1:2,"LABOH","LaAB,uOH",6883480,128\r\n' +
        '2:60,1:2,"LABOH;","LaAB,uOH_;",6883476,128\r\n' +
        '2:61,1:2,"LABOH;N","LaAB,uOHe;N",6883544,128\r\n' +
        '2:62,1:2,"LABOC","LaAB,uOC,",6883492,128\r\n' +
        '2:63,1:2,"LABOCON","LaAB,uOC,uON",6883556,128\r\n' +
        '2:64,1:2,"LABON","LaAB,uON",6883568,128\r\n' +
        '2:65,1:2,"LAB;","LoAB,;",6883504,128\r\n' +
        '2:66,1:3,"ABHOTA","AaB,oHuOT,oA",6914048,192\r\n' +
        '2:67,1:4,"ABHON","AeB\'HuON",6881492,128\r\n' +
        '2:68,1:4,"OABC;","OeAB\'eC,;",6882984,128\r\n' +
        '2:69,1:4,"ABA","AeB\'oA",6881280,320\r\n' +
        '2:70,1:5,"ABD","AoB,eD,",109772800,128\r\n'
    );
    const parsedfile =
      '59,2,"LABOH","LaAB,uOH",6883480,128\r\n' +
      '60,2,"LABOH;","LaAB,uOH_;",6883476,128\r\n' +
      '61,2,"LABOH;N","LaAB,uOHe;N",6883544,128\r\n' +
      '62,2,"LABOC","LaAB,uOC,",6883492,128\r\n' +
      '63,2,"LABOCON","LaAB,uOC,uON",6883556,128\r\n' +
      '64,2,"LABON","LaAB,uON",6883568,128\r\n' +
      '65,2,"LAB;","LoAB,;",6883504,128\r\n' +
      '66,3,"ABHOTA","AaB,oHuOT,oA",6914048,192\r\n' +
      '67,4,"ABHON","AeB\'HuON",6881492,128\r\n' +
      '68,4,"OABC;","OeAB\'eC,;",6882984,128\r\n' +
      '69,4,"ABA","AeB\'oA",6881280,320\r\n' +
      '70,5,"ABD","AoB,eD,",109772800,128\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('English', () => {
  it('Parse English File', () => {
    const file = sut.parseEnglish(
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
      '15,null,"perishing","","","",0,0\r\n' +
      '16,8,"pipe","","","",0,0\r\n' +
      '17,8,"flute","","","",0,0\r\n' +
      '18,9,"Abijah","","","(son of Rehoboam)",2,0\r\n' +
      '19,10,"Abijah","","","(founder of a course of priests)",2,0\r\n' +
      '20,11,"Abiud","","","",0,0\r\n' +
      '21,12,"Abilene","","","",0,0\r\n' +
      '22,13,"Abiathar","","","",0,0\r\n' +
      '23,14,"mourner","","","",0,0\r\n' +
      '24,15,"grieve","","","",4096,0\r\n' +
      '25,15,"mourn","","","",4096,0\r\n' +
      '26,16,"mourning","","","",0,0\r\n' +
      '27,16,"grief","","","",0,0\r\n' +
      '28,16,"sadness","","","",0,0\r\n' +
      '29,17,"stone","","","",0,0\r\n' +
      '30,18,"Abraham","","","",0,0\r\n' +
      '31,null,"Abram","","","",0,0\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Etymology', () => {
  it('Parse Etymology File', () => {
    const file = sut.parseEtymology(
      '4:56,NULL,"409.000000",8\r\n' +
        '4:57,1:424,"410.000000",8\r\n' +
        '4:58,1:560,"ga\\256r",5\r\n' +
        '4:59,1:578,"glcsso\\256komon",5\r\n' +
        '4:60,1:607,"ge\\256now",5\r\n' +
        '4:61,1:669,"do\\256mow",5\r\n' +
        '4:62,1:696,"dhna\\256rion",5\r\n' +
        '4:63,1:697,"diayh\\256kh",5\r\n' +
        '4:64,1:774,"h\\254gemc\\256n",5\r\n' +
        '4:65,1:775,"h\\254gemc\\256n",21\r\n' +
        '4:66,1:777,"i\\255dic\\256thw",5\r\n' +
        '4:67,1:795,"767.000000",6\r\n' +
        '4:68,1:809,"e\\255parjei\\256a",5\r\n' +
        '4:69,1:818,"a\\261rcma",5\r\n' +
        '4:70,1:825,"ai\\260resiw",5\r\n' +
        '4:71,1:859,"zeu\\264gos",5\r\n'
    );
    const parsedfile =
      '56,null,"409.000000",8\r\n' +
      '57,424,"410.000000",8\r\n' +
      '58,560,"ga\\256r",5\r\n' +
      '59,578,"glcsso\\256komon",5\r\n' +
      '60,607,"ge\\256now",5\r\n' +
      '61,669,"do\\256mow",5\r\n' +
      '62,696,"dhna\\256rion",5\r\n' +
      '63,697,"diayh\\256kh",5\r\n' +
      '64,774,"h\\254gemc\\256n",5\r\n' +
      '65,775,"h\\254gemc\\256n",21\r\n' +
      '66,777,"i\\255dic\\256thw",5\r\n' +
      '67,795,"767.000000",6\r\n' +
      '68,809,"e\\255parjei\\256a",5\r\n' +
      '69,818,"a\\261rcma",5\r\n' +
      '70,825,"ai\\260resiw",5\r\n' +
      '71,859,"zeu\\264gos",5\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('BFBS/UBS', () => {
  it('Parse BFBS/UBS File', () => {
    const file = sut.parseUbs(
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
      '-32628,541601508,33567919,0\r\n' +
      '-32627,541601509,33572533,0\r\n' +
      '-32626,541601510,33557662,-28672\r\n' +
      '-32625,541601511,33555860,4100\r\n' +
      '-32624,541601512,33555337,0\r\n' +
      '-32623,541601513,33558837,0\r\n' +
      '-32622,541601514,33563118,0\r\n' +
      '-32621,541601515,33565392,-32764\r\n' +
      '-32620,541601516,33565838,0\r\n' +
      '-32619,541601517,33574171,0\r\n' +
      '-32618,541601518,33557095,0\r\n' +
      '-32617,541601519,33555871,-32752\r\n';
    test.strictEqual(file, parsedfile, 'parsed file');
  });
});

describe('Sedra model', () => {
  it('Make Root', () => {
    const m = sut.makeRoot(1, 'ABOBA', 'abb          |0', 2);
    test.strictEqual(m.root, 'ABOBA', 'root matching');
    test.strictEqual(m.sort, 'abb          |0', 'sort matching');
    test.strictEqual(m.attributes, 2, 'attributes matching');
  });
  it('Make Lexeme', () => {
    const m = sut.makeLexeme(2, 55, 'AKOTA', 37749824, 16);
    test.strictEqual(m.rootId, 55, 'rootId matching');
    test.strictEqual(m.lexeme, 'AKOTA', 'lexeme matching');
    test.strictEqual(
      m.morphologicalType,
      37749824,
      'morphologicalType matching'
    );
    test.strictEqual(m.attributes, 16, 'attributes matching');
  });
  it('Make Word', () => {
    const m = sut.makeWord(3, 55, 'MOBDO', "MaOB'oD,uO", 369098752, 128);
    test.strictEqual(m.lexemeId, 55, 'lexemeId matching');
    test.strictEqual(m.word, 'MOBDO', 'word matching');
    test.strictEqual(m.vocalised, "MaOB'oD,uO", 'vocalised matching');
    test.strictEqual(
      m.morphologicalType,
      369098752,
      'morphologicalType matching'
    );
    test.strictEqual(m.attributes, 128, 'attributes matching');
  });
  it('Make English', () => {
    const m = sut.makeEnglish(
      3,
      71,
      'kindle',
      'make',
      '(in Egypt)',
      'w/ &NuORoA& ',
      10240,
      1
    );
    test.strictEqual(m.lexemeId, 71, 'lexemeId matching');
    test.strictEqual(m.word, 'kindle', 'word matching');
    test.strictEqual(m.before, 'make', 'before matching');
    test.strictEqual(m.after, '(in Egypt)', 'after matching');
    test.strictEqual(m.comment, 'w/ &NuORoA& ', 'comment matching');
    test.strictEqual(m.attributes, 10240, 'attributes matching');
    test.strictEqual(m.flag, 1, 'flag matching');
  });
  it('Make Etymology', () => {
    const m = sut.makeEtymology(4, 46, 'eu\\255jaristi\\256a', 5);
    test.strictEqual(m.lexemeId, 46, 'lexemeId matching');
    test.strictEqual(m.word, 'eu\\255jaristi\\256a', 'word matching');
    test.strictEqual(m.attributes, 5, 'attributes matching');
  });
  it('Make Ubs', () => {
    const m = sut.makeUbs(86, 520100906, 33554991, 4);
    test.strictEqual(m.id, 86, 'id matching');
    test.strictEqual(m.reference, 520100906, 'reference matching');
    test.strictEqual(m.wordId, 33554991, 'wordId matching');
    test.strictEqual(m.parentWordId, 4, 'parentWordId matching');
  });
});
