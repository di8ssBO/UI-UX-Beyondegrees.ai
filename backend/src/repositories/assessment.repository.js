import { query } from '../db/pool.js';

export const assessmentRepo = {
  async create({ device, locale, profileId = null }) {
    const { rows } = await query(
      `INSERT INTO assessments (device, locale, profile_id)
       VALUES ($1, $2, $3)
       RETURNING id, status, created_at`,
      [device, locale, profileId]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await query('SELECT * FROM assessments WHERE id = $1', [id]);
    return rows[0] ?? null;
  },

  async markCompleted(id, client = { query }) {
    await client.query(
      `UPDATE assessments SET status='completed', completed_at=now() WHERE id=$1`,
      [id]
    );
  },
};