import { asyncHandler } from '../utils/async-handler.js';
import { ok } from '../utils/respond.js';
import { referenceRepo } from '../repositories/reference.repository.js';

export const referenceController = {
  // GET /reference/disciplines
  disciplines: asyncHandler(async (_req, res) => {
    ok(res, await referenceRepo.getDisciplines());
  }),

  // GET /reference/majors?discipline=75
  majors: asyncHandler(async (req, res) => {
    const id = Number(req.query.discipline);
    ok(res, await referenceRepo.getMajorsByDiscipline(id));
  }),
};