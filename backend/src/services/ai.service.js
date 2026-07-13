import { env } from '../config/index.js';

const SYSTEM_PROMPT = `You are an adaptive survey engine helping students aged 14-18
discover suitable academic paths. Select the NEXT best assertion from the POOL that
maximizes information gain. ONLY pick an ID from the POOL. NEVER invent IDs.
NEVER select an ID from asked_ids. Output JSON ONLY:
{"selected_id":"<ID>","domain":"<domain>","riasec_primary":"<R/I/A/S/E/C>","stage":"<stage>","reasoning":"<1 sentence>"}`;

// Gọi Fanar 1 lần, có timeout. Trả object JSON hoặc null nếu lỗi/503.
async function callFanar(userMessage, temperature) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), env.AI_TIMEOUT_MS);
  try {
    const res = await fetch(env.FANAR_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${env.FANAR_API_KEY}`,  // key chỉ ở server
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Fanar-C-2-27B',
        max_tokens: 300,
        temperature,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
      }),
    });
    if (res.status === 503) return null;
    if (!res.ok) throw new Error(`Fanar HTTP ${res.status}`);
    const data = await res.json();
    let content = data.choices[0].message.content.trim();
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');  // bỏ rào code
    return JSON.parse(content);
  } catch {
    return null;            // lỗi mạng/timeout/parse → để engine tự fallback
  } finally {
    clearTimeout(t);
  }
}

export const aiService = {
  // Thử 2 nhiệt độ như engine gốc; trả selected_id hợp lệ hoặc null
  async pickAssertion(userMessage, { poolIds, askedIds }) {
    for (const [i, temp] of [0.4, 0.65].entries()) {
      if (i > 0) await new Promise((r) => setTimeout(r, 1000));
      const result = await callFanar(userMessage, temp);
      if (!result) continue;
      const id = String(result.selected_id ?? '').trim();
      if (poolIds.has(id) && !askedIds.has(id)) return { ...result, selected_id: id };
    }
    return null;            // cả 2 lần đều hỏng → caller dùng code fallback
  },
};