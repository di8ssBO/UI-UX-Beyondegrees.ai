import { describe, it, expect } from 'vitest';
import { scoreOf, computeScores } from '../../src/services/scoring.service.js';

describe('scoring.service', () => {
  it('map nhãn -> điểm đúng', () => {
    expect(scoreOf('Absolutely agree')).toBe(2);
    expect(scoreOf('Unsure')).toBe(0);
    expect(scoreOf('Totally disagree')).toBe(-2);
  });

  it('tính top discipline theo điểm cộng dồn', () => {
    const answers = [
      { answer_label: 'Absolutely agree', domain: 'sci' },
      { answer_label: 'Agree', domain: 'sci' },
      { answer_label: 'Disagree', domain: 'art' },
    ];
    const { topDisciplines } = computeScores(answers);
    expect(topDisciplines[0]).toBe('sci');   // sci = +3, art = -1
  });
});