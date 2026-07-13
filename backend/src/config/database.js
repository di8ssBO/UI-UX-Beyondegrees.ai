import pg from 'pg';
import { env } from './env.js';

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.PGSSL ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => console.error('Lỗi pool Postgres:', err));