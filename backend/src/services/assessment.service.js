import { withTransaction } from '../db/pool.js';
import { assessmentRepo } from '../repositories/assessment.repository.js';
import { answerRepo } from '../repositories/answer.repository.js';
import { resultRepo } from '../repositories/result.repository.js';
import { eventRepo } from '../repositories/event.repository.js';
import { assertionService } from './assertion.service.js';
import { computeScores } from './scoring.service.js';
import { NotFoundError } from '../errors/index.js';

export const assessmentService = {
  start: (dto) => assessmentRepo.create(dto),

  async saveAnswer(id, answer) {
    const a = await assessmentRepo.findById(id);
    if (!a) throw new NotFoundError('Không tìm thấy assessment');
    await answerRepo.insert(id, answer);
    return { ok: true };
  },

  // Lấy câu hỏi tiếp theo dựa trên lịch sử đã lưu
  async getNext(id) {
    const a = await assessmentRepo.findById(id);
    if (!a) throw new NotFoundError('Không tìm thấy assessment');
    const answers = await answerRepo.listByAssessment(id);   // kèm domain qua JOIN nếu có
    const askedIds = new Set(answers.map((x) => String(x.assertion_id)));
    const next = await assertionService.pickNext(answers.length, answers, askedIds);
    if (!next) return { done: true };                        // hết câu
    await eventRepo.log(id, 'next_assertion', { id: next.id, reasoning: next.reasoning });
    return { done: false, assertion: next };
  },

  // Kết thúc: tính điểm cuối + ghi kết quả (transaction)
  async finalize(id) {
    const answers = await answerRepo.listByAssessment(id);
    const scores = computeScores(answers);
    const result = {
      top_discipline: scores.topDisciplines[0] ?? null,
      ratios: scores.domain,
      riasec: {},                       // điền khi đã có metadata RIASEC
      raw_ai_output: { topDisciplines: scores.topDisciplines },
    };
    return withTransaction(async (client) => {
      await resultRepo.insert(id, result, client);
      await assessmentRepo.markCompleted(id, client);
      return result;
    });
  },
};