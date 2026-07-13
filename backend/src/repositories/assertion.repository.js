import { query } from '../db/pool.js';

export const assertionRepo = {
  // Pool: assertion đúng stage, đang active, CHƯA bị hỏi
  async poolByStage(stage, askedIds) {
  const { rows } = await query(
    `SELECT id, content, stage, domain, subdomain
       FROM assertions
      WHERE stage = $1 AND is_active = true
        AND ($2::int[] IS NULL OR id <> ALL($2))`,
    [stage, askedIds.length ? askedIds : null]
  );
  return rows;
},
  async findById(id) {
    const { rows } = await query('SELECT * FROM assertions WHERE id = $1', [id]);
    return rows[0] ?? null;
  },
};