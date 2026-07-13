import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from '../config/index.js';

// 1) helmet: set hàng loạt HTTP header an toàn (chống XSS, clickjacking...)
export const helmetMw = helmet();

// 2) CORS: chỉ cho các domain hợp lệ gọi API
export const corsMw = cors({
  origin: env.CORS_ORIGINS,        // mảng domain từ .env
  credentials: true,
});

// 3) Rate limit: chặn spam (vd ai đó bắn 10.000 request tạo assessment)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,        // 15 phút
  max: 300,                        // tối đa 300 request / IP / 15 phút
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Quá nhiều yêu cầu, thử lại sau.' } },
});