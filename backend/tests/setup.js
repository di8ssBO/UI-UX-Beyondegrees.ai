import dotenv from 'dotenv';
// override:true để GHI ĐÈ biến môi trường bằng giá trị trong .env.test
dotenv.config({ path: '.env.test', override: true });
import { afterAll, beforeEach } from 'vitest';
import { pool } from '../src/config/database.js';

beforeEach(async () => {
  // chỉ xoá bảng "bài làm", giữ nguyên dữ liệu tham chiếu (nếu có seed)
  await pool.query('TRUNCATE assessment_events, assessment_results, assessment_answers, assessments RESTART IDENTITY CASCADE');
});
afterAll(async () => { await pool.end(); });   // đóng pool khi test xong