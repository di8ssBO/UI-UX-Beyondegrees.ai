import { query } from '../db/pool.js';

export const eventRepo = {
  async log(assessmentId, type, payload) {
    await query(
      `INSERT INTO assessment_events (assessment_id, event_type, payload)
       VALUES ($1,$2,$3)`,
      [assessmentId, type, payload]
    );
  },
};