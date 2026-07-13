import fs from 'node:fs';
import path from 'node:path';
import { pool } from '../src/config/database.js';

const dir = path.resolve('src/db/migrations');

async function run() {
  // Bảng ghi nhớ migration nào đã chạy
  await pool.query(`CREATE TABLE IF NOT EXISTS _migrations (
    name text PRIMARY KEY, applied_at timestamptz DEFAULT now())`);

  const applied = (await pool.query('SELECT name FROM _migrations'))
    .rows.map((r) => r.name);

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (applied.includes(file)) {
      console.log('· bỏ qua', file);
      continue;
    }
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    if (!sql.trim()) {
      console.log('· bỏ qua (file rỗng)', file);
      continue;
    }
    console.log('▶ applying', file);
    await pool.query('BEGIN');
    try {
      await pool.query(sql);
      await pool.query('INSERT INTO _migrations(name) VALUES ($1)', [file]);
      await pool.query('COMMIT');
    } catch (e) {
      await pool.query('ROLLBACK');
      throw new Error(`Migration ${file} lỗi: ${e.message}`);
    }
  }
  console.log('✅ Migrate xong');
  await pool.end();
}

run().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
