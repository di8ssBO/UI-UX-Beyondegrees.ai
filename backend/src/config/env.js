import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  PGSSL: z.string().default('false').transform((v) => v === 'true'),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('7d'),
  FANAR_API_URL: z.string().url(),
  FANAR_API_KEY: z.string().min(1),
  AI_TIMEOUT_MS: z.coerce.number().default(20000),
  CORS_ORIGINS: z.string().transform((s) => s.split(',').map((x) => x.trim())),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Sai cấu hình môi trường:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;