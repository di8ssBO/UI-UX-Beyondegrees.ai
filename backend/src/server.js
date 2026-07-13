import { app } from './app.js';
import { env } from './config/index.js';
import { pool } from './config/database.js';
import { logger } from './config/logger.js';

const server = app.listen(env.PORT, () =>
  logger.info(`🚀 BE chạy ở http://localhost:${env.PORT} (${env.NODE_ENV})`)
);

async function shutdown(signal) {
  logger.info(`${signal} — đang tắt êm...`);
  server.close(async () => {            // ngừng nhận kết nối mới
    try {
      await pool.end();                 // đóng pool DB
      logger.info('Đã đóng pool DB. Thoát.');
      process.exit(0);
    } catch (e) {
      logger.error(e, 'Lỗi khi đóng');
      process.exit(1);
    }
  });
  // Ép thoát nếu treo quá 10s
  setTimeout(() => { logger.error('Tắt quá lâu, ép thoát'); process.exit(1); }, 10000);
}

for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => shutdown(sig));

// Bắt lỗi không lường trước — log rồi thoát để được restart sạch
process.on('unhandledRejection', (e) => { logger.error(e, 'unhandledRejection'); });
process.on('uncaughtException', (e) => { logger.error(e, 'uncaughtException'); process.exit(1); });