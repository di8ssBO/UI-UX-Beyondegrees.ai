import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  // Ở dev: in đẹp, dễ đọc. Production: JSON thuần cho hệ thống thu log.
  transport: env.NODE_ENV === 'production'
    ? undefined
    : { target: 'pino-pretty', options: { colorize: true } },
});