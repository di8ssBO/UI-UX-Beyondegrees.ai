/**
 * probe-university-images.js
 * ─────────────────────────────────────────────────────────────────
 * Chạy: node probe-university-images.js
 *
 * Script này sẽ:
 *  1. Thử nhiều biến thể tên file cho từng trường (HEAD request)
 *  2. Tìm đúng icon + image URL tồn tại trong GCS bucket
 *  3. In ra UNI_IMG_MAP hoàn chỉnh để paste vào index.html
 * ─────────────────────────────────────────────────────────────────
 */

const https = require('https');

const GCS_BASE = 'https://storage.googleapis.com/beyondegrees-static-prod/university-images/';

// ── 39 universities với các biến thể tên file có thể có ──────────
const UNIVERSITIES = [
  // ── VIETNAM ──
  { id: 'fulbright', label: 'Fulbright University Vietnam', variants: [
    'Fulbright_University_Vietnam',
    'Fulbright_University',
  ]},
  { id: 'rmit', label: 'RMIT University Vietnam', variants: [
    'RMIT_University_Vietnam',
    'RMIT_Vietnam',
    'RMIT_University',
  ]},
  { id: 'fpt', label: 'FPT University', variants: [
    'FPT_University',
    'FPT_University_Vietnam',
  ]},
  { id: 'vnu-hcm', label: 'VNU Ho Chi Minh City', variants: [
    'Vietnam_National_University_Ho_Chi_Minh_City',
    'Vietnam_National_University,_Ho_Chi_Minh_City',
    'VNU_Ho_Chi_Minh_City',
    'Vietnam_National_University_-_Ho_Chi_Minh_City',
  ]},

  // ── ASIA ──
  { id: 'tokyo', label: 'University of Tokyo', variants: [
    'University_of_Tokyo',
    'The_University_of_Tokyo',
  ]},
  { id: 'kaist', label: 'KAIST', variants: [
    'KAIST',
    'Korea_Advanced_Institute_of_Science_and_Technology',
  ]},
  { id: 'tsinghua', label: 'Tsinghua University', variants: [
    'Tsinghua_University',
  ]},
  { id: 'nus', label: 'National University of Singapore', variants: [
    'National_University_of_Singapore',
    'NUS',
  ]},
  { id: 'mahidol', label: 'Mahidol University', variants: [
    'Mahidol_University',
  ]},
  { id: 'iit-bombay', label: 'IIT Bombay', variants: [
    'Indian_Institute_of_Technology_Bombay',
    'IIT_Bombay',
    'IIT_Mumbai',
  ]},
  { id: 'mica', label: 'MICA Ahmedabad', variants: [
    'MICA_Ahmedabad',
    'Mudra_Institute_of_Communications',
    'MICA',
  ]},

  // ── EUROPE ──
  { id: 'oxford', label: 'University of Oxford', variants: [
    'University_of_Oxford',
    'Oxford_University',
  ]},
  { id: 'eth', label: 'ETH Zurich', variants: [
    'ETH_Zurich',
    'ETH_Zürich',
    'Swiss_Federal_Institute_of_Technology',
  ]},
  { id: 'tum', label: 'Technical University of Munich', variants: [
    'Technical_University_of_Munich',
    'Technische_Universität_München',
    'TU_Munich',
  ]},
  { id: 'sciencespo', label: 'Sciences Po', variants: [
    'Sciences_Po',
    'Sciences_Po_Paris',
    'Institut_d\'études_politiques_de_Paris',
  ]},
  { id: 'tudelft', label: 'Delft University of Technology', variants: [
    'Delft_University_of_Technology',
    'TU_Delft',
  ]},

  // ── USA ──
  { id: 'mit', label: 'MIT', variants: [
    'Massachusetts_Institute_of_Technology',
    'MIT',
  ]},
  { id: 'columbia', label: 'Columbia University', variants: [
    'Columbia_University',
    'Columbia_University_in_the_City_of_New_York',
  ]},
  { id: 'duke', label: 'Duke University', variants: [
    'Duke_University',
  ]},
  { id: 'ucla', label: 'UCLA', variants: [
    'University_of_California_Los_Angeles',
    'University_of_California,_Los_Angeles',
    'UCLA',
  ]},
  { id: 'ucsd', label: 'UC San Diego', variants: [
    'University_of_California_San_Diego',
    'University_of_California,_San_Diego',
    'UC_San_Diego',
    'UCSD',
  ]},
  { id: 'bu', label: 'Boston University', variants: [
    'Boston_University',
  ]},
  { id: 'usc', label: 'University of Southern California', variants: [
    'University_of_Southern_California',
    'USC',
  ]},
  { id: 'ufl', label: 'University of Florida', variants: [
    'University_of_Florida',
  ]},
  { id: 'uci', label: 'UC Irvine', variants: [
    'University_of_California_Irvine',
    'University_of_California,_Irvine',
    'UC_Irvine',
    'UCI',
  ]},
  { id: 'ucf', label: 'University of Central Florida', variants: [
    'University_of_Central_Florida',
    'UCF',
  ]},
  { id: 'erau', label: 'Embry-Riddle Aeronautical University', variants: [
    'Embry-Riddle_Aeronautical_University',
    'Embry_Riddle_Aeronautical_University',
    'ERAU',
  ]},
  { id: 'fisher', label: 'Fisher College', variants: [
    'Fisher_College',
    'Fisher_College_Boston',
  ]},

  // ── AMERICAS (non-US) ──
  { id: 'ubc', label: 'University of British Columbia', variants: [
    'University_of_British_Columbia',
    'UBC',
  ]},
  { id: 'usp', label: 'University of São Paulo', variants: [
    'University_of_São_Paulo',
    'University_of_Sao_Paulo',
    'Universidade_de_São_Paulo',
  ]},
  { id: 'unam', label: 'UNAM', variants: [
    'National_Autonomous_University_of_Mexico',
    'Universidad_Nacional_Autónoma_de_México',
    'UNAM',
  ]},

  // ── AFRICA ──
  { id: 'uct', label: 'University of Cape Town', variants: [
    'University_of_Cape_Town',
    'UCT',
  ]},
  { id: 'cairo-u', label: 'Cairo University', variants: [
    'Cairo_University',
  ]},
  { id: 'nairobi', label: 'University of Nairobi', variants: [
    'University_of_Nairobi',
  ]},
  { id: 'lagos', label: 'University of Lagos', variants: [
    'University_of_Lagos',
    'UNILAG',
  ]},
  { id: 'mohammedv', label: 'Mohammed V University', variants: [
    'Mohammed_V_University',
    'Mohammed_V_University_in_Rabat',
    'Université_Mohammed_V',
  ]},

  // ── OCEANIA ──
  { id: 'anu', label: 'Australian National University', variants: [
    'Australian_National_University',
    'ANU',
  ]},
  { id: 'melbourne', label: 'University of Melbourne', variants: [
    'University_of_Melbourne',
  ]},
  { id: 'auckland', label: 'University of Auckland', variants: [
    'University_of_Auckland',
  ]},
];

// ── HTTP HEAD request helper ──────────────────────────────────────
function head(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200 ? url : null);
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

// ── Probe one university: find working icon + image ───────────────
async function probeUni(uni) {
  let iconUrl = null;
  let imageUrl = null;

  for (const v of uni.variants) {
    if (!iconUrl) {
      const u = `${GCS_BASE}${v}_-_icon.jpg`;
      const ok = await head(u);
      if (ok) iconUrl = u;
    }
    if (!imageUrl) {
      const u = `${GCS_BASE}${v}_-_image.jpg`;
      const ok = await head(u);
      if (ok) imageUrl = u;
    }
    if (iconUrl && imageUrl) break;
  }

  return { id: uni.id, label: uni.label, iconUrl, imageUrl };
}

// ── Main ──────────────────────────────────────────────────────────
(async () => {
  console.log(`\nProbing GCS bucket for ${UNIVERSITIES.length} universities...\n`);
  console.log('Base URL:', GCS_BASE, '\n');

  const results = [];

  // Run in batches of 5 to avoid flooding
  const BATCH = 5;
  for (let i = 0; i < UNIVERSITIES.length; i += BATCH) {
    const batch = UNIVERSITIES.slice(i, i + BATCH);
    const batchResults = await Promise.all(batch.map(probeUni));
    for (const r of batchResults) {
      const iconStatus  = r.iconUrl  ? '✅' : '❌';
      const imageStatus = r.imageUrl ? '✅' : '❌';
      console.log(`${iconStatus} icon  ${imageStatus} image  [${r.id}] ${r.label}`);
      if (r.iconUrl)  console.log(`       icon:  ${r.iconUrl}`);
      if (r.imageUrl) console.log(`       image: ${r.imageUrl}`);
    }
    results.push(...batchResults);
  }

  // ── Output final JS mapping ───────────────────────────────────
  console.log('\n\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║  Paste the block below into features/university/matches/  ║');
  console.log('║  index.html, replacing the UNI_IMG_MAP variable           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  const found    = results.filter(r => r.iconUrl || r.imageUrl);
  const notFound = results.filter(r => !r.iconUrl && !r.imageUrl);

  let js = `var UNI_IMG_MAP = {\n`;
  for (const r of results) {
    js += `  '${r.id}': {\n`;
    js += `    icon:  ${r.iconUrl  ? `'${r.iconUrl}'`  : 'null'},\n`;
    js += `    image: ${r.imageUrl ? `'${r.imageUrl}'` : 'null'},\n`;
    js += `  },\n`;
  }
  js += `};\n`;

  console.log(js);

  console.log(`\nSummary:`);
  console.log(`  ✅ Found: ${found.length} / ${UNIVERSITIES.length} universities`);
  if (notFound.length) {
    console.log(`  ❌ Not found (${notFound.length}):`, notFound.map(r => r.id).join(', '));
  }
})();
