// Nạp metadata (domain/subdomain, và chuẩn hoá stage theo tag D/M/U) cho assertion
// từ assertion_bank_en.py. Chạy SAU migration 0002:
//   node scripts/import_assertion_meta.js
// Mặc định đọc ../../assertion_bank_en.py (gốc D:\BEYONDEGREES). Override bằng BANK_FILE.

import fs from 'node:fs';
import path from 'node:path';
import { pool } from '../src/config/database.js';

const BANK = process.env.BANK_FILE
  ? path.resolve(process.env.BANK_FILE)
  : path.resolve('..', '..', 'assertion_bank_en.py');

// Trích object ASSERTIONS = {...} từ file .py (Python) -> JSON
function parseBank(file) {
  const py = fs.readFileSync(file, 'utf8');
  const start = py.indexOf('{', py.indexOf('ASSERTIONS'));
  if (start < 0) throw new Error('Không tìm thấy ASSERTIONS trong ' + file);
  let depth = 0, end = -1;
  for (let i = start; i < py.length; i++) {
    const c = py[i];
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) { end = i; break; }
  }
  const json = py.slice(start, end + 1)
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/,(\s*[}\]])/g, '$1');   // bỏ trailing comma
  return JSON.parse(json);
}

async function run() {
  console.log('📖 Đọc bank:', BANK);
  const bank = parseBank(BANK);
  const ids = Object.keys(bank);
  console.log('Số assertion trong bank:', ids.length);

  let updated = 0, notFound = 0;
  await pool.query('BEGIN');
  try {
    for (const id of ids) {
      const { tag, d, sd } = bank[id];
      const res = await pool.query(
        `UPDATE assertions
            SET domain = $2, subdomain = $3, stage = $4
          WHERE id = $1`,
        [Number(id), d ?? null, sd ?? null, String(tag || '').toLowerCase() || null]
      );
      if (res.rowCount === 0) notFound++; else updated += res.rowCount;
    }
    await pool.query('COMMIT');
  } catch (e) {
    await pool.query('ROLLBACK');
    throw e;
  }

  console.log(`✅ Cập nhật metadata: ${updated} assertion (không thấy id: ${notFound}).`);
  await pool.end();
}

run().catch((e) => { console.error('❌', e.message); process.exit(1); });
