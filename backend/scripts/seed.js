import fs from 'node:fs';
import path from 'node:path';
import { pool } from '../src/config/database.js';

const dir = path.resolve('src/db/seeds');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
for (const f of files) {
  console.log('▶ seed', f);
  await pool.query(fs.readFileSync(path.join(dir, f), 'utf8'));
}
console.log('✅ Seed xong');
await pool.end();