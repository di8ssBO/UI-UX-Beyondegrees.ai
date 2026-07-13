import { query } from '../db/pool.js';

export const resultRepo = {
  async insert(assessmentId, r, client = { query }) {
    await client.query(
      `INSERT INTO assessment_results
         (assessment_id, top_discipline, ratios, riasec, raw_ai_output)
       VALUES ($1,$2,$3,$4,$5)`,
      [assessmentId, r.top_discipline, r.ratios, r.riasec, r.raw_ai_output]
    );
  },
};