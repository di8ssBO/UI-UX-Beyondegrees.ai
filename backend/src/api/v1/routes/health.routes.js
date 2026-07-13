import { Router } from 'express';
import { pool } from '../../../config/database.js';
const router = Router();
router.get('/', (_req, res) => res.json({ status: 'ok' }));            // liveness
router.get('/ready', async (_req, res) => {                            // readiness
  try { await pool.query('SELECT 1'); res.json({ status: 'ready' }); }
  catch { res.status(503).json({ status: 'not_ready' }); }
});
export default router;