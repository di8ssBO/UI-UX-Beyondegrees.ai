import { asyncHandler } from '../utils/async-handler.js';
import { ok, created } from '../utils/respond.js';
import { assessmentService } from '../services/assessment.service.js';

export const assessmentController = {
  // POST /assessments  → tạo phiên làm bài
  start: asyncHandler(async (req, res) => {
    const result = await assessmentService.start(req.body);
    created(res, result);
  }),

  // POST /assessments/:id/answers  → lưu 1 câu trả lời
  saveAnswer: asyncHandler(async (req, res) => {
    const result = await assessmentService.saveAnswer(req.params.id, req.body);
    created(res, result);
  }),

  // GET /assessments/:id/next  → lấy câu hỏi tiếp theo (engine chọn)
  getNext: asyncHandler(async (req, res) => {
    const result = await assessmentService.getNext(req.params.id);
    ok(res, result);
  }),

  // POST /assessments/:id/finalize  → tính kết quả + chốt phiên
  finalize: asyncHandler(async (req, res) => {
    const result = await assessmentService.finalize(req.params.id);
    ok(res, result);
  }),
};