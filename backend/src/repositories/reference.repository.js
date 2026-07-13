import { query } from '../db/pool.js';

export const referenceRepo = {
  async getDisciplines() {
    const { rows } = await query('SELECT * FROM disciplines ORDER BY id');
    return rows;
  },
  async getMajorsByDiscipline(disciplineId) {
    const { rows } = await query(
      'SELECT * FROM majors WHERE discipline_id = $1 ORDER BY name_en', [disciplineId]);
    return rows;
  },
};