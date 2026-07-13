import { assertionRepo } from '../repositories/assertion.repository.js';
import { aiService } from './ai.service.js';
import { computeScores } from './scoring.service.js';

// Quy ước stage theo số câu đã hỏi (điều chỉnh theo thiết kế 30 câu của bạn)
function stageFor(position) {
  if (position < 5) return { key: 'early_values', dbStage: 'd' };
  if (position < 10) return { key: 'early_broad', dbStage: 'd' };   // Buổi 9: 10 câu đầu chưa lộ label
  if (position < 20) return { key: 'middle_probe', dbStage: 'm' };
  if (position < 25) return { key: 'late_habit', dbStage: 'm' };
  return { key: 'late_constraint', dbStage: 'u' };
}

const FANAR_STAGES = new Set(['early_broad', 'middle_probe']);

export const assertionService = {
  // position: câu thứ mấy (0-based). answers: lịch sử trả lời (kèm domain nếu có)
  async pickNext(position, answers, askedIds) {
    const { key: stageKey, dbStage } = stageFor(position);

    // Pool = assertion hợp stage & chưa hỏi
    const pool = await assertionRepo.poolByStage(dbStage, [...askedIds]);
    if (pool.length === 0) return null;          // hết câu

    const poolIds = new Set(pool.map((p) => String(p.id)));
    const scores = computeScores(answers);

    // 1) Stage cần suy luận → thử Fanar trước
    if (FANAR_STAGES.has(stageKey)) {
      const userMessage = buildUserMessage({ position, stageKey, scores, pool, askedIds });
      const picked = await aiService.pickAssertion(userMessage, {
        poolIds, askedIds: new Set([...askedIds].map(String)),
      });
      if (picked) {
        const chosen = pool.find((p) => String(p.id) === picked.selected_id);
        return decorate(chosen, position, picked.reasoning);
      }
    }

    // 2) Fallback bằng code: chọn assertion điểm cao nhất theo coverage/top domain
    const chosen = selectByScore(pool, scores) ?? pool[0];
    return decorate(chosen, position);
  },
};

// Chọn bằng code khi không gọi Fanar (hoặc Fanar hỏng)
function selectByScore(pool, scores) {
  let best = null, bestP = -Infinity;
  for (const a of pool) {
    let p = 0;
    if (a.domain && scores.topDisciplines.includes(a.domain)) p += 30;
    if (a.subdomain && scores.subdomain[a.subdomain] === undefined) p += 20; // chưa khám phá
    if (a.domain && (scores.domain[a.domain] ?? 0) === 0) p += 15;           // lấp coverage
    if (p > bestP) { bestP = p; best = a; }
  }
  return best;
}

// Gắn cờ ẩn label cho 10 câu đầu (đúng quyết định Buổi 9)
function decorate(assertion, position, reasoning = 'code selection') {
  return {
    id: assertion.id,
    content: assertion.content,
    stage: assertion.stage,
    position: position + 1,
    showDiscipline: position >= 10,   // FE: 10 câu đầu KHÔNG hiện discipline
    reasoning,
  };
}

// Dựng message gửi Fanar (rút gọn từ build_user_message gốc)
function buildUserMessage({ position, stageKey, scores, pool, askedIds }) {
  const poolText = pool
    .map((p) => `${p.id}|${p.stage.toUpperCase()}|${p.domain ?? 'gen'}: ${p.content}`)
    .join('\n');
  return [
    `assertion_number: ${position + 1} / 30`,
    `current_stage: ${stageKey}`,
    `TOP_DISCIPLINES: ${JSON.stringify(scores.topDisciplines)}`,
    `DOMAIN_SCORES: ${JSON.stringify(scores.domain)}`,
    `FORBIDDEN_IDS: ${JSON.stringify([...askedIds].map(String))}`,
    `POOL (chọn 1 id từ đây):\n${poolText}`,
    'Return JSON only.',
  ].join('\n\n');
}