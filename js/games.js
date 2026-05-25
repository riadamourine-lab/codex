// ============================================================
//  NEXUS GAMING — Games Database
// ============================================================
const SERIES_META = {
  re:    { label:'Resident Evil',      color:'#ff006e' },
  gta:   { label:'Grand Theft Auto',   color:'#ff6600' },
  hit:   { label:'Hitman',             color:'#cccccc' },
  tr:    { label:'Tomb Raider',        color:'#d4a04a' },
  mp:    { label:'Max Payne',          color:'#ff3333' },
  forza: { label:'Forza Horizon',      color:'#00aaff' },
  mafia: { label:'Mafia Series',       color:'#cc8800' },
};

const REQ_ROWS = [
  ['نظام التشغيل','os'],
  ['المعالج','cpu'],
  ['الرام','ram'],
  ['كارت الشاشة','gpu'],
  ['التخزين','storage'],
  ['DirectX','dx'],
];

const GAMES = [

  /* ===================== RESIDENT EVIL ===================== */
  {
    s:'re', bl:'RE4', t:'Resident Evil 4 HD', y:2005,
    g:'Action Horror', r:'9.7', sz:'4 GB',
    ca:'#ff7700', ca2:'#994400', img:'re4',
    mag:'magnet:?xt=urn:btih:1ABCCE2EB137BB22F9FE7C0D3CB59BE6A246FCC9',
    dev:'Capcom', pub:'Capcom',
    platform:'PC / PS2 / PS4 / GameCube', modes:'Single Player',
    desc:'العميل ليون كينيدي يُرسَل إلى قرية أوروبية نائية لإنقاذ ابنة الرئيس الأمريكي. يجد نفسه في مواجهة لوس إليوميناداس — طائفة مسيطر عليها بعدوى بيولوجية. هذه اللعبة غيّرت صناعة الألعاب للأبد بابتكار نظام الكاميرا من الكتف الذي تبنّته كل الألعاب من بعدها.',
    tags:[{l:'18+',c:'#cc0000'},{l:'CAPCOM',c:'rgba(255,255,255,.1)'},{l:'2005',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo 2.4GHz',ram:'2 GB',gpu:'GTX 260 / HD 4870',storage:'8 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i5-2400',ram:'4 GB',gpu:'GTX 560 / HD 6870',storage:'8 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'re', bl:'RE4R', t:'Resident Evil 4 Remake', y:2023,
    g:'Action Horror', r:'9.6', sz:'67 GB',
    ca:'#ff8800', ca2:'#bb4400', img:'re4r',
    mag:'magnet:?xt=urn:btih:672FB5F6EDAC967120937A558F75521EC0183D21',
    dev:'Capcom', pub:'Capcom',
    platform:'PC / PS5 / Xbox Series X', modes:'Single Player',
    desc:'إعادة تصور كاملة للأسطورة بتقنية RE Engine الحديثة. كل ما أحببته في الأصل موجود وأكثر — معارك أعمق، بيئات مُعاد تصميمها من الصفر، شخصيات أغنى وقصص جانبية جديدة تماماً.',
    tags:[{l:'18+',c:'#cc0000'},{l:'REMAKE',c:'#bf00ff'},{l:'2023',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i7-8700',ram:'16 GB',gpu:'GTX 1070 / RX 5700',storage:'60 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-9700K',ram:'16 GB',gpu:'RTX 2080 / RX 6800 XT',storage:'60 GB SSD',dx:'DirectX 12'}
    }
  },
  {
    s:'re', bl:'RE5', t:'Resident Evil 5', y:2009,
    g:'Action Horror', r:'7.9', sz:'7 GB',
    ca:'#dd6600', ca2:'#883300', img:'re5',
    mag:'magnet:?xt=urn:btih:CEA142F56BCD10AB75A28828ADF749C14DBF64E0',
    dev:'Capcom', pub:'Capcom',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Co-op',
    desc:'كريس ريدفيلد وشيفا ألومار في قلب أفريقيا يواجهان فيروساً بيولوجياً جديداً يحوّل البشر إلى ماجيني. أول RE بتعاون كامل للاعبين — التجربة مختلفة كلياً عند اللعب مع صديق.',
    tags:[{l:'18+',c:'#cc0000'},{l:'CO-OP',c:'rgba(0,200,100,.4)'},{l:'2009',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo 2.4GHz',ram:'2 GB',gpu:'GTX 260 / HD 4870',storage:'8 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i5-2400',ram:'4 GB',gpu:'GTX 560 / HD 5870',storage:'8 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'re', bl:'RE6', t:'Resident Evil 6', y:2012,
    g:'Action Horror', r:'7.0', sz:'16 GB',
    ca:'#555566', ca2:'#333344', img:'re6',
    mag:'magnet:?xt=urn:btih:12F37A82C901CC9934919347E3C3F66ECFEABFE0',
    dev:'Capcom', pub:'Capcom',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Co-op / Versus',
    desc:'أربع حملات متوازية — ليون وكريس وجايك وعادا — تتشابك في ملحمة الزومبي الأضخم في تاريخ RE. تقاطع القصص الأربعة وعشرات الساعات من المحتوى تجعلها الأكبر في السلسلة.',
    tags:[{l:'18+',c:'#cc0000'},{l:'4 CAMPAIGNS',c:'rgba(0,245,255,.3)'},{l:'2012',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core i2.8GHz Quad',ram:'2 GB',gpu:'GTX 560 / HD 6970',storage:'16 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-3770',ram:'8 GB',gpu:'GTX 680 / HD 7970',storage:'16 GB',dx:'DirectX 11'}
    }
  },
  {
    s:'re', bl:'RE8', t:'Resident Evil Village', y:2021,
    g:'Survival Horror', r:'9.2', sz:'35 GB',
    ca:'#ddaa00', ca2:'#886600', img:'re8',
    mag:'magnet:?xt=urn:btih:DACA1785D39A77A1871EC612CCB572B1D0150267',
    dev:'Capcom', pub:'Capcom',
    platform:'PC / PS5 / Xbox Series X', modes:'Single Player',
    desc:'إيثان وينتر يقتحم قرية أوروبية مرعبة بحثاً عن ابنته المخطوفة. أربعة لوردات رهيبون يسيطرون على مناطق مختلفة. ليدي دميتريسكو الشهيرة عالمياً. من أكثر ألعاب RE مبيعاً.',
    tags:[{l:'18+',c:'#cc0000'},{l:'RE ENGINE',c:'rgba(255,119,0,.4)'},{l:'2021',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i5-7600',ram:'8 GB',gpu:'GTX 1070 / RX 5500 XT',storage:'50 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-8700',ram:'16 GB',gpu:'RTX 2070 / RX 6700 XT',storage:'50 GB SSD',dx:'DirectX 12'}
    }
  },

  /* ===================== GTA ===================== */
  {
    s:'gta', bl:'GTA3', t:'Grand Theft Auto III', y:2001,
    g:'Open World 3D', r:'9.0', sz:'600 MB',
    ca:'#ff8800', ca2:'#bb5500', img:'gta3',
    mag:'magnet:?xt=urn:btih:21952A6B70909CB5A9503B5928E2E045A62C5A7B',
    dev:'Rockstar North', pub:'Rockstar Games',
    platform:'PC / PS2 / Xbox', modes:'Single Player',
    desc:'الثورة التي غيّرت عالم الألعاب — أول GTA ثلاثي الأبعاد بعالم مفتوح حقيقي. كلود الصامت يصعد من الخيانة إلى قمة الجريمة في Liberty City الحية المليئة بالتفاصيل.',
    tags:[{l:'18+',c:'#ff6600'},{l:'ROCKSTAR',c:'rgba(255,255,255,.1)'},{l:'2001',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo',ram:'2 GB',gpu:'GTX 260',storage:'2 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i3',ram:'4 GB',gpu:'GTX 560',storage:'2 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'gta', bl:'VC', t:'GTA: Vice City', y:2002,
    g:'Open World', r:'9.5', sz:'1.4 GB',
    ca:'#ff4499', ca2:'#aa2266', img:'gtavc',
    mag:'magnet:?xt=urn:btih:C98B836E76FA0AC4FB917E5744DA6B52C592B89A',
    dev:'Rockstar North', pub:'Rockstar Games',
    platform:'PC / PS2', modes:'Single Player',
    desc:'توماس فيرشيتي في ثمانينيات Miami المشمسة. موسيقى لا تُنسى، نخيل، مافيا إيطالية، ودراما لا تنتهي. من الصفر إلى إمبراطور جريمة — الأيقونة الخالدة.',
    tags:[{l:'18+',c:'#ff6600'},{l:'ROCKSTAR',c:'rgba(255,255,255,.1)'},{l:'2002',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo',ram:'2 GB',gpu:'GTX 260',storage:'3 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i3',ram:'4 GB',gpu:'GTX 560',storage:'3 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'gta', bl:'SA', t:'GTA: San Andreas', y:2004,
    g:'Open World', r:'9.7', sz:'4.7 GB',
    ca:'#ff6600', ca2:'#993300', img:'gtasa',
    mag:'magnet:?xt=urn:btih:06618B01528161CF9DF0F7A35C06CB6FF064FD8A',
    dev:'Rockstar North', pub:'Rockstar Games',
    platform:'PC / PS2', modes:'Single Player',
    desc:'CJ يعود لـ Los Santos ليجد عائلته مدمّرة. ثلاث مدن عملاقة + مناطق ريفية + حرية لا نهاية. أضخم GTA في عصره وأكثرها تأثيراً في الثقافة الشعبية.',
    tags:[{l:'18+',c:'#ff6600'},{l:'ROCKSTAR',c:'rgba(255,255,255,.1)'},{l:'2004',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo',ram:'2 GB',gpu:'GTX 260',storage:'5 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i3',ram:'4 GB',gpu:'GTX 560',storage:'5 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'gta', bl:'GTA4', t:'Grand Theft Auto IV', y:2008,
    g:'Open World', r:'9.5', sz:'16 GB',
    ca:'#99aacc', ca2:'#445566', img:'gta4',
    mag:'magnet:?xt=urn:btih:937CEF5D447A785CC8B659134A9D3EFD271706CA',
    dev:'Rockstar North', pub:'Rockstar Games',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Online',
    desc:'نيكو بيليك يفر من الحرب إلى Liberty City باحثاً عن خائن الماضي والحلم الأمريكي. أعمق قصة في السلسلة وعالم تفصيلي واقعي مذهل مع فيزياء لم تُر من قبل.',
    tags:[{l:'18+',c:'#ff6600'},{l:'ROCKSTAR',c:'rgba(255,255,255,.1)'},{l:'2008',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Quad 2.4GHz',ram:'4 GB',gpu:'GTX 260 / HD 4870',storage:'22 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core i5',ram:'8 GB',gpu:'GTX 560 / HD 6870',storage:'22 GB',dx:'DirectX 10'}
    }
  },
  {
    s:'gta', bl:'GTA5', t:'Grand Theft Auto V', y:2013,
    g:'Open World', r:'9.8', sz:'95 GB',
    ca:'#00ccff', ca2:'#005588', img:'gta5',
    mag:'magnet:?xt=urn:btih:BB4D1F0B0CA6CC1993F1532DFAECDF0B976B9266',
    dev:'Rockstar North', pub:'Rockstar Games',
    platform:'PC / PS5 / Xbox Series', modes:'Single Player / GTA Online',
    desc:'مايكل وتريفور وفرانكلين في Los Santos الضخمة. 185 مليون نسخة مباعة — أكثر لعبة مبيعاً في تاريخ الترفيه البشري. GTA Online لا يزال حياً بمحتوى لا ينتهي بعد 10 سنوات.',
    tags:[{l:'18+',c:'#ff6600'},{l:'ONLINE',c:'rgba(0,204,255,.4)'},{l:'2013',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i5-3470',ram:'8 GB',gpu:'GTX 660 2GB / HD 7870',storage:'72 GB',dx:'DirectX 10'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-3770',ram:'16 GB',gpu:'GTX 970 4GB / RX 480 4GB',storage:'72 GB SSD',dx:'DirectX 11'}
    }
  },

  /* ===================== HITMAN ===================== */
  {
    s:'hit', bl:'C47', t:'Hitman: Codename 47', y:2000,
    g:'Stealth', r:'7.5', sz:'500 MB',
    ca:'#888', ca2:'#333', img:'hmc47',
    mag:'magnet:?xt=urn:btih:738BB244CCF91135A65F93116FFA8C3A0021AFB6',
    dev:'IO Interactive', pub:'Eidos Interactive',
    platform:'PC', modes:'Single Player',
    desc:'الميلاد الأسطوري للعميل 47 — المستنسخ القاتل يتحرر ويبدأ مسيرة الاغتيال. أول رحلة لرجل لا اسم له إلا الرقم في عالم الجريمة المنظمة.',
    tags:[{l:'18+',c:'#880000'},{l:'IO INTERACTIVE',c:'rgba(255,255,255,.1)'},{l:'2000',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Pentium III 450MHz',ram:'1 GB',gpu:'DirectX 7 Card',storage:'1 GB',dx:'DirectX 7'},
      rec:{os:'Windows 10',cpu:'Core 2 Duo',ram:'2 GB',gpu:'GTX 260',storage:'1 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'hit', bl:'HM2SA', t:'Hitman 2: Silent Assassin', y:2002,
    g:'Stealth', r:'8.0', sz:'700 MB',
    ca:'#aaa', ca2:'#555', img:'hm2_old',
    mag:'magnet:?xt=urn:btih:B54B5125483F06B1E0027421A6EF4915C0D21707',
    dev:'IO Interactive', pub:'Eidos Interactive',
    platform:'PC / PS2 / Xbox / GCN', modes:'Single Player',
    desc:'العميل 47 يتقاعد كبستاني في صقلية حتى يُختطف صديقه القسيس. مجبر على العودة للعمل القذر في مهام اغتيال تتطلب صبراً واستراتيجية في مواقع حول العالم.',
    tags:[{l:'18+',c:'#880000'},{l:'IO INTERACTIVE',c:'rgba(255,255,255,.1)'},{l:'2002',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Pentium III 700MHz',ram:'2 GB',gpu:'GeForce 2 MX',storage:'2 GB',dx:'DirectX 8'},
      rec:{os:'Windows 10',cpu:'Core i3',ram:'4 GB',gpu:'GTX 460',storage:'2 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'hit', bl:'ABS', t:'Hitman: Absolution', y:2012,
    g:'Stealth Action', r:'7.8', sz:'15 GB',
    ca:'#cc0000', ca2:'#880000', img:'hm_abs',
    mag:'magnet:?xt=urn:btih:9C39CFD418887CE17620BD3DD1C8A59680DF9B2A',
    dev:'IO Interactive', pub:'Square Enix',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Contracts',
    desc:'47 يحمي فتاة من ICA التي أصدرت أمر قتل بحقه. أكثر أجزاء Hitman عاطفية وسردية — يكشف جانباً إنسانياً في قاتل بارد الدم. نظام Contracts يتيح إنشاء مهامك ومشاركتها.',
    tags:[{l:'18+',c:'#cc0000'},{l:'IO INTERACTIVE',c:'rgba(255,255,255,.1)'},{l:'2012',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo 2.66GHz',ram:'4 GB',gpu:'GTX 460 / HD 5850',storage:'17 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10',cpu:'Core i5-2500',ram:'8 GB',gpu:'GTX 570 / HD 6970',storage:'17 GB',dx:'DirectX 11'}
    }
  },
  {
    s:'hit', bl:'H16', t:'Hitman (2016)', y:2016,
    g:'Stealth Sandbox', r:'8.9', sz:'45 GB',
    ca:'#c0c0c0', ca2:'#606060', img:'hm1',
    mag:'magnet:?xt=urn:btih:CFD225632D0B1C084F4DB469610E253648C5F666',
    dev:'IO Interactive', pub:'Square Enix',
    platform:'PC / PS4 / Xbox One', modes:'Single Player / Contracts',
    desc:'إعادة إطلاق كاملة — Sandbox مفتوح في خرائط ضخمة حول العالم. باريس، مراكش، بانكوك، كولورادو — كل خريطة عالم قائم بذاته مع حرية مطلقة في طريقة الاغتيال.',
    tags:[{l:'18+',c:'#880000'},{l:'SANDBOX',c:'rgba(0,245,255,.3)'},{l:'2016',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core i5-2500K',ram:'8 GB',gpu:'GTX 660 / HD 7870',storage:'50 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-3770',ram:'16 GB',gpu:'GTX 970 / RX 480',storage:'50 GB SSD',dx:'DirectX 12'}
    }
  },
  {
    s:'hit', bl:'HM2', t:'Hitman 2 (2018)', y:2018,
    g:'Stealth Sandbox', r:'9.0', sz:'60 GB',
    ca:'#dd2244', ca2:'#881122', img:'hm2',
    mag:'magnet:?xt=urn:btih:601A0D81E30D93603F7F39D1E4D75817A3B91D28',
    dev:'IO Interactive', pub:'Warner Bros.',
    platform:'PC / PS4 / Xbox One', modes:'Single Player / Ghost Mode',
    desc:'مطاردة Shadow Client في 6 مواقع استثنائية — كولومبيا، ميامي، مومباي، نيو زيلندا، آيسلندا، شمال أمريكا. Ghost Mode التنافسي يتيح منافسة لاعب آخر في نفس الخريطة.',
    tags:[{l:'18+',c:'#cc0000'},{l:'GHOST MODE',c:'rgba(0,245,255,.3)'},{l:'2018',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i5-2500K',ram:'8 GB',gpu:'GTX 660 / R9 390',storage:'65 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-4790',ram:'16 GB',gpu:'GTX 1070 / RX 5700',storage:'65 GB SSD',dx:'DirectX 12'}
    }
  },
  {
    s:'hit', bl:'HM3', t:'Hitman 3', y:2021,
    g:'Stealth Sandbox', r:'9.2', sz:'70 GB',
    ca:'#ffffff', ca2:'#888888', img:'hm3',
    mag:'magnet:?xt=urn:btih:42E13AE00AF8B8516C333361E692EF1C0EB5EFAA',
    dev:'IO Interactive', pub:'IO Interactive',
    platform:'PC / PS5 / Xbox Series', modes:'Single Player / Freelancer',
    desc:'الخاتمة الملحمية — دبي، داربوورث، برلين، تشونغتشينغ، مندوزا. الأجمل بصرياً والأكمل تصميماً في السلسلة. وضع Freelancer يضيف بُعداً Roguelike مدمراً للإدمان.',
    tags:[{l:'18+',c:'#880000'},{l:'FREELANCER',c:'rgba(0,245,255,.3)'},{l:'2021',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i5-4460',ram:'8 GB',gpu:'GTX 770 / RX Vega 56',storage:'80 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-6700K',ram:'16 GB',gpu:'RTX 2070 / RX 5700 XT',storage:'80 GB SSD',dx:'DirectX 12'}
    }
  },

  /* ===================== TOMB RAIDER ===================== */
  {
    s:'tr', bl:'TR13', t:'Tomb Raider (2013)', y:2013,
    g:'Survival Action', r:'9.2', sz:'12 GB',
    ca:'#ff7722', ca2:'#cc4411', img:'tr13',
    mag:'magnet:?xt=urn:btih:F45DF73FE220FC666C89532DE3921F6900D58BDE',
    dev:'Crystal Dynamics', pub:'Square Enix',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Multiplayer',
    desc:'لارا كروفت الشابة تتحطم سفينتها على جزيرة يامي وتجد نفسها تواجه طائفة دموية. رحلة البقاء تلك ولّدت المحاربة الأسطورية — من طالبة جامعية مرهفة إلى لارا كروفت الحقيقية.',
    tags:[{l:'18+',c:'#d4a04a'},{l:'CRYSTAL DYNAMICS',c:'rgba(255,255,255,.1)'},{l:'2013',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core i3-2100',ram:'4 GB',gpu:'GTX 560 Ti / HD 6950',storage:'12 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i5-3570K',ram:'8 GB',gpu:'GTX 660 Ti / HD 7970',storage:'12 GB',dx:'DirectX 11'}
    }
  },
  {
    s:'tr', bl:'ROTR', t:'Rise of the Tomb Raider', y:2015,
    g:'Survival Action', r:'9.4', sz:'22 GB',
    ca:'#88bbff', ca2:'#3366aa', img:'rotr2',
    mag:'magnet:?xt=urn:btih:E20DE4759E4472D2FA46393E7D11E6355079AB2E',
    dev:'Crystal Dynamics', pub:'Square Enix',
    platform:'PC / PS4 / Xbox One', modes:'Single Player',
    desc:'لارا تبحث عن سر الخلود في سيبيريا المجمدة ضد منظمة Trinity. أجمل الأجزاء الثلاثة بصرياً مع توسع كبير في الحرف والصيد والاستكشاف في بيئات شتوية مذهلة.',
    tags:[{l:'18+',c:'#d4a04a'},{l:'CRYSTAL DYNAMICS',c:'rgba(255,255,255,.1)'},{l:'2015',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core i3-2100',ram:'6 GB',gpu:'GTX 650 Ti / HD 7770',storage:'25 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-3770K',ram:'8 GB',gpu:'GTX 970 / R9 290X',storage:'25 GB SSD',dx:'DirectX 11'}
    }
  },
  {
    s:'tr', bl:'SOTR', t:'Shadow of the Tomb Raider', y:2018,
    g:'Survival Action', r:'8.8', sz:'35 GB',
    ca:'#009944', ca2:'#005522', img:'sotr',
    mag:'magnet:?xt=urn:btih:2BCE35C6FCEC37697FC6D26047FC2BE63698E030&dn=ShadowOfTheTombRaiderElAmigos',
    dev:'Eidos Montréal', pub:'Square Enix',
    platform:'PC / PS4 / Xbox One', modes:'Single Player',
    desc:'الخاتمة — لارا تتبع Trinity إلى بيرو وتدرك أن تدخلها أشعل نبوءة نهاية العالم. أكثر الأجزاء سواداً وعمقاً، مع أدغال مذهلة ومعابد مايا ضائعة.',
    tags:[{l:'18+',c:'#d4a04a'},{l:'EIDOS',c:'rgba(255,255,255,.1)'},{l:'2018',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i7-3770',ram:'8 GB',gpu:'GTX 970 / RX 470',storage:'40 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-4770K',ram:'16 GB',gpu:'GTX 1070 / RX 5700',storage:'40 GB SSD',dx:'DirectX 12'}
    }
  },

  /* ===================== MAX PAYNE ===================== */
  {
    s:'mp', bl:'MP1', t:'Max Payne 1', y:2001,
    g:'Third-Person Shooter', r:'9.0', sz:'900 MB',
    ca:'#cc2200', ca2:'#661100', img:'mp1',
    mag:'magnet:?xt=urn:btih:F1D1A4B6FA6240B9DC209D21F71FFB3A145E02D9',
    dev:'Remedy Entertainment', pub:'Rockstar Games',
    platform:'PC / PS2 / Xbox', modes:'Single Player',
    desc:'ضابط مكافحة المخدرات يجد عائلته مذبوحة ونفسه متهماً. Max Payne اخترع Bullet Time في الألعاب — تباطؤ الزمن أثناء القفز وإطلاق النار في سرد نوار سينمائي لا يُنسى.',
    tags:[{l:'18+',c:'#cc2200'},{l:'BULLET TIME',c:'rgba(255,50,50,.4)'},{l:'2001',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Pentium III 600MHz',ram:'1 GB',gpu:'GeForce 256 DDR',storage:'1.5 GB',dx:'DirectX 8'},
      rec:{os:'Windows 10',cpu:'Core 2 Duo',ram:'2 GB',gpu:'GTX 260',storage:'1.5 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'mp', bl:'MP2', t:'Max Payne 2: The Fall', y:2003,
    g:'Third-Person Shooter', r:'8.8', sz:'2 GB',
    ca:'#cc1111', ca2:'#770000', img:'mp2',
    mag:'magnet:?xt=urn:btih:3558A0CA220CB3E889F72ED47ACBBC0E296FF5BB',
    dev:'Remedy Entertainment', pub:'Rockstar Games',
    platform:'PC / PS2 / Xbox', modes:'Single Player',
    desc:'Max يعود لـ NYPD ويلتقي بموناليزا مونرو الغامضة التي تسحبه مجدداً إلى الظلام. قصة حب ونار في نيويورك الليلية — أقصر الأجزاء وأكثرها كثافة عاطفية.',
    tags:[{l:'18+',c:'#cc2200'},{l:'BULLET TIME',c:'rgba(255,50,50,.4)'},{l:'2003',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Pentium III 1GHz',ram:'2 GB',gpu:'GeForce 3 / Radeon 8500',storage:'3 GB',dx:'DirectX 9'},
      rec:{os:'Windows 10',cpu:'Core 2 Duo',ram:'4 GB',gpu:'GTX 460',storage:'3 GB',dx:'DirectX 9'}
    }
  },
  {
    s:'mp', bl:'MP3', t:'Max Payne 3', y:2012,
    g:'Third-Person Shooter', r:'8.9', sz:'35 GB',
    ca:'#ff6600', ca2:'#993300', img:'mp3',
    mag:'magnet:?xt=urn:btih:BAEA7731FC449003136540F5C092BF9EB748E4B5',
    dev:'Rockstar Studios', pub:'Rockstar Games',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player / Multiplayer',
    desc:'Max أصلع وخمّير في São Paulo البرازيلية يحرس عائلة ثرية تُختطف. رحلة بقاء وانتقام في أدغال المافيا البرازيلية بإنتاج Rockstar الكامل وموسيقى HEALTH الأيقونية.',
    tags:[{l:'18+',c:'#cc2200'},{l:'ROCKSTAR',c:'rgba(255,255,255,.1)'},{l:'2012',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core 2 Quad / Phenom X3 8750',ram:'2 GB',gpu:'GTX 260 / HD 4870',storage:'35 GB',dx:'DirectX 10'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-3770',ram:'8 GB',gpu:'GTX 580 / HD 7870',storage:'35 GB',dx:'DirectX 11'}
    }
  },

  /* ===================== FORZA HORIZON ===================== */
  {
    s:'forza', bl:'FH4', t:'Forza Horizon 4', y:2018,
    g:'Racing / Open World', r:'9.5', sz:'100 GB',
    ca:'#00aaff', ca2:'#005588', img:'fh4',
    mag:'magnet:?xt=urn:btih:56F3A028805017B2F516E9917A5CA9FFFFC6879C',
    dev:'Playground Games', pub:'Xbox Game Studios',
    platform:'PC / Xbox One / Xbox Series', modes:'Single Player / Online',
    desc:'بريطانيا المذهلة في أربعة فصول متغيرة ديناميكياً — صيف حار، خريف ذهبي، شتاء جليدي، ربيع مزهر. مشهد الأوراق في الخريف والمطر الجليدي شتاءً من أجمل ما في تاريخ ألعاب السيارات.',
    tags:[{l:'PEGI 3',c:'#0055cc'},{l:'PLAYGROUND',c:'rgba(255,255,255,.1)'},{l:'2018',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i3-7100 / Ryzen 3 1200',ram:'8 GB',gpu:'GTX 970 / RX 470',storage:'100 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-3820 / Ryzen 5 1500X',ram:'16 GB',gpu:'GTX 1070 / RX Vega 56',storage:'100 GB SSD',dx:'DirectX 12'}
    }
  },
  {
    s:'forza', bl:'FH5', t:'Forza Horizon 5', y:2021,
    g:'Racing / Open World', r:'9.6', sz:'103 GB',
    ca:'#00ddff', ca2:'#0077aa', img:'fh5',
    mag:'magnet:?xt=urn:btih:5F36DB2567C12FAC325A6361C842C1EF56628B1F',
    dev:'Playground Games', pub:'Xbox Game Studios',
    platform:'PC / Xbox One / Xbox Series', modes:'Single Player / Online',
    desc:'المكسيك بكل تنوعها — صحراء، أدغال، بركان، شواطئ، مدن قديمة. أكثر من 500 سيارة وعالم مفتوح ضخم بتفاصيل بصرية تذهل العقل. أفضل لعبة سيارات في التاريخ.',
    tags:[{l:'PEGI 3',c:'#0055cc'},{l:'PLAYGROUND',c:'rgba(255,255,255,.1)'},{l:'2021',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 10 64-bit',cpu:'Core i5-8400 / Ryzen 5 1500X',ram:'8 GB',gpu:'GTX 970 / RX 470',storage:'110 GB',dx:'DirectX 12'},
      rec:{os:'Windows 10/11 64-bit',cpu:'Core i7-8700K / Ryzen 7 3800XT',ram:'16 GB',gpu:'RTX 2080 / RX 5700 XT',storage:'110 GB SSD',dx:'DirectX 12'}
    }
  },

  /* ===================== MAFIA ===================== */
  {
    s:'mafia', bl:'M2', t:'Mafia II', y:2010,
    g:'Open World Crime', r:'8.5', sz:'8 GB',
    ca:'#cc8800', ca2:'#664400', img:'mafia2',
    mag:'magnet:?xt=urn:btih:C9E7834BB33F709865A6FD525112E052F30B40A4',
    dev:'2K Czech', pub:'2K Games',
    platform:'PC / PS3 / Xbox 360', modes:'Single Player',
    desc:'فيتو سكالتا يعود من الحرب العالمية الثانية ليجد نفسه في قلب المافيا الأمريكية في خمسينيات Empire Bay المذهلة. قصة إجرائية عميقة في حقبة ذهبية من موسيقى الجاز والسيارات الكلاسيكية.',
    tags:[{l:'18+',c:'#cc8800'},{l:'2K CZECH',c:'rgba(255,255,255,.1)'},{l:'2010',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7',cpu:'Core 2 Duo 2.4GHz',ram:'2 GB',gpu:'GTX 260 / HD 4870',storage:'8 GB',dx:'DirectX 10'},
      rec:{os:'Windows 10',cpu:'Core i5-2500',ram:'4 GB',gpu:'GTX 560 / HD 6870',storage:'8 GB',dx:'DirectX 11'}
    }
  },
  {
    s:'mafia', bl:'M3', t:'Mafia III', y:2016,
    g:'Open World Crime', r:'7.5', sz:'30 GB',
    ca:'#dd7700', ca2:'#883300', img:'mafia3',
    mag:'magnet:?xt=urn:btih:524E608B9B76D0E124C70676106F01BEA54670CB',
    dev:'Hangar 13', pub:'2K Games',
    platform:'PC / PS4 / Xbox One', modes:'Single Player',
    desc:'لينكولن كلاي يعود من فيتنام ليجد عائلته المافيائية مذبوحة. انتقام لا يرحم في New Bordeaux عام 1968 — أجواء سياسية واجتماعية ثرية مع موسيقى تلك الحقبة الأيقونية.',
    tags:[{l:'18+',c:'#cc8800'},{l:'HANGAR 13',c:'rgba(255,255,255,.1)'},{l:'2016',c:'rgba(255,255,255,.07)'}],
    req:{
      min:{os:'Windows 7 64-bit',cpu:'Core i5-2500K / FX-8120',ram:'8 GB',gpu:'GTX 660 / HD 7870',storage:'30 GB',dx:'DirectX 11'},
      rec:{os:'Windows 10 64-bit',cpu:'Core i7-3770 / FX-8350',ram:'16 GB',gpu:'GTX 970 / R9 390',storage:'30 GB SSD',dx:'DirectX 11'}
    }
  },
];
