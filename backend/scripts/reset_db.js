// CHỈ DÙNG Ở DEV. Xoá sạch toàn bộ schema public rồi tạo lại trống.
// Dùng khi cần dựng lại DB từ đầu (vd sau khi sửa 0001_init.sql).
// Sau khi chạy: npm run migrate && node scripts/import_csv.js
import { pool } from '../src/config/database.js';

async function run() {
  await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  console.log('✅ Đã reset schema public (mọi bảng & dữ liệu đã bị xoá).');
  await pool.end();
}

run().catch((e) => {
  console.error('❌ Reset lỗi:', e.message);
  process.exit(1);
});
