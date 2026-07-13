// Import dữ liệu thật từ bộ CSV (BeyonDegrees-UI/data) vào Postgres.
// Chạy SAU khi đã migrate: node scripts/import_csv.js
// Thứ tự import theo khoá ngoại: disciplines -> majors -> specializations
//   -> assertions -> universities -> junction (khớp theo tên).

import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { pool } from '../src/config/database.js';

// Thư mục data: mặc định ../data so với gốc backend. Có thể override bằng DATA_DIR.
const DATA = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve('..', 'data');

const FILES = {
  disciplines: 'Disciplines export.csv',
  majors: 'Majors export.csv',
  specializations: 'Specialization-2026-05-09.csv',
  universitiesIntl: 'University-2026-05-09.csv',
  universitiesVN: 'University_Import_VietNam.csv',
  junction: 'UniversitySpecializationLevel-2026-05-12.csv',
  assertions: 'Assertion-2026-05-09.csv',
};

function readCsv(file) {
  const raw = fs.readFileSync(path.join(DATA, file), 'utf8');
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    bom: true,            // bỏ BOM (file VN có BOM ở cột id)
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  });
}

const toBool = (v) => String(v).trim().toLowerCase() === 'true';
const nz = (v) => (v === undefined || v === null || String(v).trim() === '' ? null : v);

// Chèn nhiều dòng theo lô để nhanh. columns: tên cột; rows: mảng object.
async function bulkInsert(table, columns, rows, conflict = '') {
  if (!rows.length) return 0;
  const CHUNK = 500;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const params = [];
    const tuples = [];
    let p = 1;
    for (const r of chunk) {
      tuples.push(`(${columns.map(() => `$${p++}`).join(',')})`);
      for (const c of columns) params.push(r[c] ?? null);
    }
    const sql = `INSERT INTO ${table} (${columns.join(',')})
                 VALUES ${tuples.join(',')} ${conflict}`;
    const res = await pool.query(sql, params);
    inserted += res.rowCount;
  }
  return inserted;
}

async function run() {
  console.log('📂 Đọc CSV từ:', DATA);

  // 1) disciplines (giữ id gốc)
  const disc = readCsv(FILES.disciplines).map((d) => ({
    id: Number(d.id),
    name: d.title,
    description: nz(d.description),
  }));
  let n = await bulkInsert('disciplines', ['id', 'name', 'description'], disc,
    'ON CONFLICT (id) DO NOTHING');
  console.log(`✔ disciplines: ${n}/${disc.length}`);

  // 2) majors (FK -> disciplines)
  const majors = readCsv(FILES.majors).map((m) => ({
    id: Number(m.id),
    discipline_id: nz(m.discipline) ? Number(m.discipline) : null,
    name: m.title,
    description: nz(m.description),
  }));
  n = await bulkInsert('majors', ['id', 'discipline_id', 'name', 'description'], majors,
    'ON CONFLICT (id) DO NOTHING');
  console.log(`✔ majors: ${n}/${majors.length}`);

  // 3) specializations (giữ id gốc)
  const specs = readCsv(FILES.specializations).map((s) => ({
    id: Number(s.id),
    name: s.title,
    description: nz(s.description),
    admission_requirements: nz(s.admission_requirements),
    recommended_skills: nz(s.recommended_skills),
    entrance_exams: nz(s.entrance_exams),
    language_requirements: nz(s.language_requirements),
  }));
  n = await bulkInsert('specializations',
    ['id', 'name', 'description', 'admission_requirements',
      'recommended_skills', 'entrance_exams', 'language_requirements'],
    specs, 'ON CONFLICT (id) DO NOTHING');
  console.log(`✔ specializations: ${n}/${specs.length}`);

  // 4) assertions (suy ra stage: u > m > d)
  const asrt = readCsv(FILES.assertions).map((a) => {
    const hu = toBool(a.has_university);
    const hm = toBool(a.has_major);
    const hd = toBool(a.has_discipline);
    const stage = hu ? 'u' : hm ? 'm' : 'd';
    return {
      id: Number(a.id),
      content: a.content,
      has_discipline: hd,
      has_major: hm,
      has_university: hu,
      stage,
    };
  });
  n = await bulkInsert('assertions',
    ['id', 'content', 'has_discipline', 'has_major', 'has_university', 'stage'],
    asrt, 'ON CONFLICT (id) DO NOTHING');
  console.log(`✔ assertions: ${n}/${asrt.length}`);

  // 5) universities (gộp intl + VN, khoá theo name)
  const uIntl = readCsv(FILES.universitiesIntl).map((u) => ({
    name: u.name, location: nz(u.location), country: null,
    website: nz(u.website), global_rank: nz(u.global_rank), source: 'intl',
  }));
  const uVN = readCsv(FILES.universitiesVN).map((u) => ({
    name: u.name, location: nz(u.location), country: 'Vietnam',
    website: nz(u.website), global_rank: nz(u.global_rank), source: 'vn',
  }));
  const unis = [...uIntl, ...uVN].filter((u) => nz(u.name));
  n = await bulkInsert('universities',
    ['name', 'location', 'country', 'website', 'global_rank', 'source'],
    unis, 'ON CONFLICT (name) DO NOTHING');
  console.log(`✔ universities: ${n}/${unis.length}`);

  // 6) junction — khớp tên trường & chuyên ngành sang id
  const uRows = (await pool.query('SELECT id, name FROM universities')).rows;
  const sRows = (await pool.query('SELECT id, name FROM specializations')).rows;
  const uMap = new Map(uRows.map((r) => [r.name.trim().toLowerCase(), r.id]));
  const sMap = new Map(sRows.map((r) => [r.name.trim().toLowerCase(), r.id]));

  let skipped = 0;
  const jrows = [];
  for (const r of readCsv(FILES.junction)) {
    const uid = uMap.get(String(r.university || '').trim().toLowerCase());
    const sid = sMap.get(String(r.specialization || '').trim().toLowerCase());
    if (!uid || !sid) { skipped++; continue; }
    jrows.push({
      university_id: uid, specialization_id: sid,
      level: nz(r.level), duration: nz(r.duration),
    });
  }
  n = await bulkInsert('university_specialization_levels',
    ['university_id', 'specialization_id', 'level', 'duration'],
    jrows, 'ON CONFLICT (university_id, specialization_id, level) DO NOTHING');
  console.log(`✔ junction: ${n} chèn / ${jrows.length} khớp / bỏ qua ${skipped}`);

  console.log('✅ Import xong.');
  await pool.end();
}

run().catch((e) => {
  console.error('❌ Import lỗi:', e.message);
  process.exit(1);
});
