/* uni-data.js — trích nguyên văn UNI_DATA từ mobile features/university/matches/index.html */
var UNI_DATA = [

  /* ══ ASIA — VIETNAM (4) ══ */
  { id:'fulbright', icon:'🎓', name:'Fulbright University Vietnam',
    loc:'Ho Chi Minh City, Vietnam', country:'Vietnam', type:'intl', typeLabel:'Intl in VN',
    match:91, ranking:'#1 Liberal Arts VN', students:'1,200+', employment:'97%',
    tuition:'$30,000 / yr', aid:'Need-Based Aid', aidType:'need',
    salary:'$2,400 / mo avg', programs:['Liberal Arts','Public Policy','Business','Technology'] },

  { id:'rmit',     icon:'🏛️', name:'RMIT University Vietnam',
    loc:'Ho Chi Minh City, Vietnam', country:'Vietnam', type:'intl', typeLabel:'Intl in VN',
    match:84, ranking:'#200 World (QS)', students:'7,000+', employment:'94%',
    tuition:'$10k – $16k / yr', aid:'Full Scholarship', aidType:'full',
    salary:'$1,800 / mo avg', programs:['Computer Science','Business','Design','Engineering'] },

  { id:'fpt',      icon:'💻', name:'FPT University',
    loc:'HCM City / Hanoi / Da Nang', country:'Vietnam', type:'priv', typeLabel:'Private',
    match:82, ranking:'Top IT Private VN', students:'30,000+', employment:'96%',
    tuition:'₫25M – ₫55M / yr', aid:'FPT Full Scholarship', aidType:'full',
    salary:'$1,200 / mo avg', programs:['Software Engineering','AI','Business','Design'] },

  { id:'vnu-hcm',  icon:'🏫', name:'VNU Ho Chi Minh City',
    loc:'Ho Chi Minh City, Vietnam', country:'Vietnam', type:'pub', typeLabel:'Public',
    match:72, ranking:'#1 Vietnam (QS 2025)', students:'80,000+', employment:'88%',
    tuition:'₫15M – ₫40M / yr', aid:'Government Grant', aidType:'merit',
    salary:'$900 / mo avg', programs:['Engineering','Science','Law','Economics','Medicine'] },

  /* ══ ASIA — EAST & SOUTHEAST (5) ══ */
  { id:'tokyo',    icon:'🗼', name:'University of Tokyo',
    loc:'Tokyo, Japan', country:'Japan', type:'pub', typeLabel:'Public',
    match:67, ranking:'#28 World (QS)', students:'28,000+', employment:'97%',
    tuition:'¥535k (~$3,500) / yr', aid:'MEXT Scholarship', aidType:'full',
    salary:'$3,200 / mo avg', programs:['Engineering','Science','Medicine','Law','Economics'] },

  { id:'kaist',    icon:'🔭', name:'KAIST',
    loc:'Daejeon, South Korea', country:'South Korea', type:'pub', typeLabel:'Public',
    match:65, ranking:'#42 World (QS)', students:'10,800', employment:'98%',
    tuition:'KRW 7M (~$5,200) / yr', aid:'Korean Government Scholarship', aidType:'full',
    salary:'$3,500 / mo avg', programs:['Engineering','Science','AI & Robotics','Business','Design'] },

  { id:'tsinghua', icon:'🐉', name:'Tsinghua University',
    loc:'Beijing, China', country:'China', type:'pub', typeLabel:'Public',
    match:60, ranking:'#14 World (QS)', students:'57,000+', employment:'97%',
    tuition:'CNY 26k (~$3,600) / yr', aid:'CSC Scholarship', aidType:'full',
    salary:'$2,800 / mo avg', programs:['Engineering','Science','Economics','Law','Fine Arts'] },

  { id:'nus',      icon:'🌴', name:'National Univ. of Singapore',
    loc:'Singapore', country:'Singapore', type:'pub', typeLabel:'Public',
    match:72, ranking:'#8 World (QS)', students:'38,000+', employment:'98%',
    tuition:'S$17k – $28k / yr', aid:'ASEAN Scholarship', aidType:'full',
    salary:'$4,100 / mo avg', programs:['Computing','Business','Medicine','Law','Engineering'] },

  { id:'mahidol',  icon:'🏯', name:'Mahidol University',
    loc:'Bangkok, Thailand', country:'Thailand', type:'pub', typeLabel:'Public',
    match:55, ranking:'#215 World (QS)', students:'28,000+', employment:'92%',
    tuition:'THB 90k (~$2,500) / yr', aid:'ASEAN Scholarship', aidType:'merit',
    salary:'$1,500 / mo avg', programs:['Medicine','Public Health','Science','Engineering','Pharmacy'] },

  /* ══ ASIA — INDIA (2) ══ */
  { id:'iit-bombay', icon:'🏗️', name:'IIT Bombay',
    loc:'Mumbai, Maharashtra, India', country:'India', type:'pub', typeLabel:'Public (IIT)',
    match:52, ranking:'#118 World (QS)', students:'10,000+', employment:'98%',
    tuition:'INR 2.5L / yr (~$3k)', aid:'Merit + Need', aidType:'merit',
    salary:'$2,600 / mo avg', programs:['Engineering','Technology','Science','Design','MBA'] },

  { id:'mica',     icon:'📣', name:'MICA Ahmedabad',
    loc:'Ahmedabad, Gujarat, India', country:'India', type:'priv', typeLabel:'Private',
    match:50, ranking:'#1 Marketing India', students:'700', employment:'97%',
    tuition:'INR 21L / yr (~$25k)', aid:'Merit Scholarship', aidType:'merit',
    salary:'$1,800 / mo avg', programs:['Strategic Marketing','Communications','Media','Brand Management'] },

  /* ══ EUROPE (5) ══ */
  { id:'oxford',   icon:'🎩', name:'University of Oxford',
    loc:'Oxford, United Kingdom', country:'UK', type:'pub', typeLabel:'Public',
    match:58, ranking:'#3 World (QS)', students:'26,000+', employment:'99%',
    tuition:'£28k – £37k / yr', aid:'Clarendon Scholarship', aidType:'merit',
    salary:'$5,200 / mo avg', programs:['PPE','Medicine','Law','Engineering','Humanities'] },

  { id:'eth',      icon:'⚗️', name:'ETH Zurich',
    loc:'Zurich, Switzerland', country:'Switzerland', type:'pub', typeLabel:'Public',
    match:64, ranking:'#7 World (QS)', students:'22,000+', employment:'99%',
    tuition:'CHF 730 (~$820) / semester', aid:'Excellence Scholarship', aidType:'merit',
    salary:'$6,100 / mo avg', programs:['Engineering','Architecture','Natural Sciences','Maths','Computer Science'] },

  { id:'tum',      icon:'🍺', name:'Technical Univ. of Munich',
    loc:'Munich, Germany', country:'Germany', type:'pub', typeLabel:'Public',
    match:76, ranking:'#37 World (QS)', students:'48,000+', employment:'98%',
    tuition:'€168 (~$185) / semester', aid:'TUM Scholarship', aidType:'merit',
    salary:'$4,800 / mo avg', programs:['Engineering','Computer Science','Natural Sciences','Medicine','Management'] },

  { id:'sciencespo', icon:'🗽', name:'Sciences Po Paris',
    loc:'Paris, France', country:'France', type:'pub', typeLabel:'Public',
    match:74, ranking:'Top 200 World (QS)', students:'14,000+', employment:'96%',
    tuition:'€14k / yr (~$15k)', aid:'Eiffel Excellence Scholarship', aidType:'merit',
    salary:'$4,200 / mo avg', programs:['Political Science','Law','Economics','Journalism','International Affairs'] },

  { id:'tudelft',  icon:'🌷', name:'Delft Univ. of Technology',
    loc:'Delft, Netherlands', country:'Netherlands', type:'pub', typeLabel:'Public',
    match:71, ranking:'#57 World (QS)', students:'26,000+', employment:'97%',
    tuition:'€18k / yr (~$20k)', aid:'Holland Scholarship', aidType:'merit',
    salary:'$4,600 / mo avg', programs:['Architecture','Civil Eng.','Aerospace Eng.','Industrial Design','Computer Science'] },

  /* ══ AMERICAS — USA (12) ══ */
  { id:'mit',      icon:'🔬', name:'MIT',
    loc:'Cambridge, MA, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:93, ranking:'#1 World (QS)', students:'11,500+', employment:'99%',
    tuition:'$59,750 / yr', aid:'Full Need-Based', aidType:'full',
    salary:'$7,200 / mo avg', programs:['Engineering','Computer Science','Architecture','Management','Science'] },

  { id:'columbia', icon:'🏛️', name:'Columbia University',
    loc:'New York City, NY, USA', country:'USA', type:'priv', typeLabel:'Private (Ivy)',
    match:82, ranking:'#12 World (US News)', students:'35,000+', employment:'97%',
    tuition:'$70,000 / yr', aid:'Full Need-Based', aidType:'need',
    salary:'$6,400 / mo avg', programs:['Business','Law','Engineering','Journalism','Arts & Sciences'] },

  { id:'duke',     icon:'🏟️', name:'Duke University',
    loc:'Durham, NC, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:88, ranking:'#23 World (QS)', students:'16,680+', employment:'98%',
    tuition:'$65,000 / yr', aid:'Full Need-Based', aidType:'need',
    salary:'$6,800 / mo avg', programs:['Medicine','Public Policy','Engineering','Business','Law'] },

  { id:'ucla',     icon:'🐻', name:'UCLA',
    loc:'Los Angeles, CA, USA', country:'USA', type:'pub', typeLabel:'Public',
    match:85, ranking:'#40 World (QS)', students:'46,678+', employment:'96%',
    tuition:'$44,000 / yr', aid:'Need + Merit Aid', aidType:'merit',
    salary:'$5,900 / mo avg', programs:['Computer Science','Film & TV','Business','Engineering','Life Sciences'] },

  { id:'ucsd',     icon:'🌊', name:'UC San Diego (UCSD)',
    loc:'San Diego, CA, USA', country:'USA', type:'pub', typeLabel:'Public',
    match:80, ranking:'#62 World (QS)', students:'42,600+', employment:'95%',
    tuition:'$44,000 / yr', aid:'Need + Merit Aid', aidType:'need',
    salary:'$5,600 / mo avg', programs:['Computer Science','Biology','Engineering','Medicine','Economics'] },

  { id:'bu',       icon:'🦅', name:'Boston University',
    loc:'Boston, MA, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:76, ranking:'Top 100 World (QS)', students:'33,972+', employment:'94%',
    tuition:'$65,000 / yr', aid:'Need + Merit Aid', aidType:'merit',
    salary:'$5,400 / mo avg', programs:['Communications','Business','Engineering','Public Health','Liberal Arts'] },

  { id:'usc',      icon:'⚔️', name:'Univ. of Southern California',
    loc:'Los Angeles, CA, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:79, ranking:'Top 150 World (QS)', students:'49,500+', employment:'95%',
    tuition:'$67,000 / yr', aid:'Full Need-Based', aidType:'need',
    salary:'$5,700 / mo avg', programs:['Film & Media','Business','Engineering','Architecture','Law'] },

  { id:'ufl',      icon:'🐊', name:'University of Florida',
    loc:'Gainesville, FL, USA', country:'USA', type:'pub', typeLabel:'Public',
    match:74, ranking:'Top 200 World (QS)', students:'60,500+', employment:'94%',
    tuition:'$28,000 / yr', aid:'Merit-Based Aid', aidType:'merit',
    salary:'$4,800 / mo avg', programs:['Engineering','Business','Health Sciences','Agriculture','Architecture'] },

  { id:'uci',      icon:'🦅', name:'UC Irvine',
    loc:'Irvine, CA, USA', country:'USA', type:'pub', typeLabel:'Public',
    match:72, ranking:'Top 150 World (QS)', students:'37,000+', employment:'93%',
    tuition:'$45,000 / yr', aid:'Need + Merit Aid', aidType:'merit',
    salary:'$5,100 / mo avg', programs:['Computer Science','Business','Social Ecology','Engineering','Biology'] },

  { id:'ucf',      icon:'⚡', name:'Univ. of Central Florida',
    loc:'Orlando, FL, USA', country:'USA', type:'pub', typeLabel:'Public',
    match:70, ranking:'Top 500 World', students:'70,000+', employment:'91%',
    tuition:'$23,000 / yr', aid:'Merit-Based Aid', aidType:'merit',
    salary:'$4,200 / mo avg', programs:['Engineering','Computer Science','Hospitality','Education','Business'] },

  { id:'erau',     icon:'✈️', name:'Embry-Riddle Aeronautical Univ.',
    loc:'Daytona Beach, FL, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:75, ranking:'#4 Aerospace US', students:'33,168+', employment:'97%',
    tuition:'$47,814 / yr', aid:'Merit-Based Aid', aidType:'merit',
    salary:'$5,300 / mo avg', programs:['Aerospace Engineering','Aviation','Computer Science','Business','Security'] },

  { id:'fisher',   icon:'🎓', name:'Fisher College',
    loc:'Boston, MA, USA', country:'USA', type:'priv', typeLabel:'Private',
    match:71, ranking:'#43 Regional (US News)', students:'1,500+', employment:'90%',
    tuition:'$35,524 / yr', aid:'Merit-Based Aid', aidType:'merit',
    salary:'$3,800 / mo avg', programs:['Business','Healthcare Management','Criminal Justice','Sport Management'] },

  { id:'ubc',      icon:'🍁', name:'Univ. of British Columbia',
    loc:'Vancouver, BC, Canada', country:'Canada', type:'pub', typeLabel:'Public',
    match:69, ranking:'#34 World (QS)', students:'66,000+', employment:'95%',
    tuition:'CAD $38k (~$28k) / yr', aid:'International Major Entrance Scholarship', aidType:'merit',
    salary:'$3,800 / mo avg', programs:['Science','Engineering','Arts','Medicine','Business','Forestry'] },

  { id:'usp',      icon:'🌿', name:'Univ. of São Paulo',
    loc:'São Paulo, Brazil', country:'Brazil', type:'pub', typeLabel:'Public',
    match:44, ranking:'#101 World (QS)', students:'90,000+', employment:'91%',
    tuition:'Free (public)', aid:'FUVEST Merit Grant', aidType:'merit',
    salary:'$1,200 / mo avg', programs:['Engineering','Medicine','Law','Architecture','Humanities'] },

  { id:'unam',     icon:'🦅', name:'UNAM (Nat. Autonomous Univ. Mexico)',
    loc:'Mexico City, Mexico', country:'Mexico', type:'pub', typeLabel:'Public',
    match:41, ranking:'#105 World (QS)', students:'360,000+', employment:'89%',
    tuition:'Free (public)', aid:'UNAM Scholarship', aidType:'merit',
    salary:'$900 / mo avg', programs:['Medicine','Law','Engineering','Arts','Social Sciences','Business'] },

  /* ══ AFRICA (5) ══ */
  { id:'uct',      icon:'🌋', name:'Univ. of Cape Town',
    loc:'Cape Town, South Africa', country:'South Africa', type:'pub', typeLabel:'Public',
    match:48, ranking:'#226 World (QS)', students:'29,000+', employment:'90%',
    tuition:'ZAR 75k (~$4,100) / yr', aid:'UCT Scholarship', aidType:'merit',
    salary:'$1,600 / mo avg', programs:['Medicine','Law','Engineering','Commerce','Humanities'] },

  { id:'cairo-u',  icon:'🏺', name:'Cairo University',
    loc:'Giza, Egypt', country:'Egypt', type:'pub', typeLabel:'Public',
    match:38, ranking:'#551 World (QS)', students:'250,000+', employment:'85%',
    tuition:'EGP 3k–10k (~$100–$350) / yr', aid:'Egyptian Government Scholarship', aidType:'full',
    salary:'$700 / mo avg', programs:['Medicine','Engineering','Law','Commerce','Arts','Sciences'] },

  { id:'nairobi',  icon:'🦁', name:'University of Nairobi',
    loc:'Nairobi, Kenya', country:'Kenya', type:'pub', typeLabel:'Public',
    match:36, ranking:'Top 5 Africa', students:'67,000+', employment:'84%',
    tuition:'KES 72k (~$560) / yr', aid:'Government Bursary', aidType:'need',
    salary:'$600 / mo avg', programs:['Medicine','Engineering','Law','Business','Architecture','Sciences'] },

  { id:'lagos',    icon:'🌊', name:'University of Lagos',
    loc:'Lagos, Nigeria', country:'Nigeria', type:'pub', typeLabel:'Public',
    match:35, ranking:'Top 10 Africa', students:'75,000+', employment:'83%',
    tuition:'NGN 80k (~$100) / yr', aid:'TETFUND Scholarship', aidType:'merit',
    salary:'$550 / mo avg', programs:['Medicine','Law','Engineering','Business','Sciences','Social Sciences'] },

  { id:'mohammedv', icon:'🌙', name:'Mohammed V University',
    loc:'Rabat, Morocco', country:'Morocco', type:'pub', typeLabel:'Public',
    match:40, ranking:'Top 3 Africa (QS)', students:'100,000+', employment:'86%',
    tuition:'MAD 2k (~$200) / yr', aid:'Moroccan Government Scholarship', aidType:'full',
    salary:'$800 / mo avg', programs:['Law','Economics','Sciences','Medicine','Engineering','Humanities'] },

  /* ══ OCEANIA (3) ══ */
  { id:'anu',      icon:'🦘', name:'Australian National University',
    loc:'Canberra, ACT, Australia', country:'Australia', type:'pub', typeLabel:'Public',
    match:61, ranking:'#30 World (QS)', students:'22,000+', employment:'97%',
    tuition:'A$35k – $45k / yr', aid:'ANU Chancellor Scholarship', aidType:'merit',
    salary:'$4,300 / mo avg', programs:['Science','Law','Arts','Engineering','Business','Public Policy'] },

  { id:'melbourne', icon:'🏅', name:'Univ. of Melbourne',
    loc:'Melbourne, VIC, Australia', country:'Australia', type:'pub', typeLabel:'Public',
    match:66, ranking:'#33 World (QS)', students:'52,000+', employment:'96%',
    tuition:'A$38k – $46k / yr', aid:'Graduate Research Scholarship', aidType:'merit',
    salary:'$4,500 / mo avg', programs:['Medicine','Law','Engineering','Commerce','Arts','Sciences'] },

  { id:'auckland',  icon:'🥝', name:'Univ. of Auckland',
    loc:'Auckland, New Zealand', country:'New Zealand', type:'pub', typeLabel:'Public',
    match:58, ranking:'#65 World (QS)', students:'45,000+', employment:'95%',
    tuition:'NZD $32k (~$19k) / yr', aid:'NZ Excellence Award', aidType:'merit',
    salary:'$3,600 / mo avg', programs:['Engineering','Medicine','Law','Commerce','Arts','Education'] }
];
window.UNI_DATA=UNI_DATA;
