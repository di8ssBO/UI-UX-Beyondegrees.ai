// Map nhãn trả lời (5 mức UI) -> trọng số điểm. Mở rộng từ thang gốc 1–4.
const WEIGHT = {
  'Absolutely agree': 2,
  Agree: 1,
  Unsure: 0,
  Disagree: -1,
  'Totally disagree': -2,
};
export const scoreOf = (label) => WEIGHT[label] ?? 0;

// answers: [{ assertion, answer_label }], mỗi assertion kèm domain/subdomain (nếu có)
export function computeScores(answers) {
  const domain = {};
  const subdomain = {};
  for (const a of answers) {
    const w = scoreOf(a.answer_label);
    if (a.domain) domain[a.domain] = (domain[a.domain] ?? 0) + w;
    if (a.subdomain) subdomain[a.subdomain] = (subdomain[a.subdomain] ?? 0) + w;
  }
  // top 3 discipline có điểm > 0
  const topDisciplines = Object.entries(domain)
    .filter(([, v]) => v > 0)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 3)
    .map(([d]) => d);
  return { domain, subdomain, topDisciplines };
}