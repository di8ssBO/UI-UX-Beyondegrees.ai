import { pool } from '../config/database.js';

// Hàm query gọn cho phần lớn truy vấn
export const query = (text, params) => pool.query(text, params);

// Transaction: dùng khi GHI nhiều bảng phải "được ăn cả, ngã về không"
export async function withTransaction(fn) {
  const client = await pool.connect();   // mượn 1 kết nối riêng khỏi pool
  try {
    await client.query('BEGIN');         // mở giao dịch
    const result = await fn(client);     // chạy các lệnh trong fn
    await client.query('COMMIT');        // mọi thứ OK -> chốt
    return result;
  } catch (err) {
    await client.query('ROLLBACK');      // có lỗi -> hoàn tác TẤT CẢ
    throw err;
  } finally {
    client.release();                    // trả kết nối về pool (bắt buộc)
  }
}