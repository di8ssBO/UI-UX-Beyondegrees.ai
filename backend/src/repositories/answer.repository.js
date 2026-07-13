import { query } from '../db/pool.js';

export const answerRepo = {
  async insert(assessmentId, a, client = { query }) {
    await client.query(
      `INSERT INTO assessment_answers
         (assessment_id, assertion_id, position, answer_value, answer_label, stage)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (assessment_id, position)
       DO UPDATE SET answer_value = EXCLUDED.answer_value,
                     answer_label = EXCLUDED.answer_label`,
      [assessmentId, a.assertion_id, a.position, a.answer_value, a.answer_label, a.stage]
    );
  },

  async listByAssessment(assessmentId) {
  const { rows } = await query(
    `SELECT aa.*, a.domain, a.subdomain
       FROM assessment_answers aa
       JOIN assertions a ON a.id = aa.assertion_id
      WHERE aa.assessment_id = $1
      ORDER BY aa.position`,
    [assessmentId]
  );
  return rows;
  },
};