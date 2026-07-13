import { env } from '../config/index.js';

// 4 tham số (err, req, res, next) => Express hiểu đây là error handler
export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode ?? 500;

  // Lỗi 500 là bug thật → log đầy đủ ở server để debug
  if (status >= 500) console.error('💥', err);

  res.status(status).json({
    error: {
      code: err.code ?? 'INTERNAL',
      // KHÔNG lộ chi tiết lỗi 500 ra ngoài khi ở production
      message: status >= 500 && env.NODE_ENV === 'production'
        ? 'Đã có lỗi xảy ra'
        : err.message,
      details: err.details,
    },
  });
}