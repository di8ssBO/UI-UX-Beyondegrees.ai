import { vi, describe, it, expect } from 'vitest';

// Thay repository thật bằng bản giả — KHAI BÁO vi.mock TRƯỚC khi import service
vi.mock('../../src/repositories/assertion.repository.js', () => ({
  assertionRepo: {
    poolByStage: vi.fn(async () => [{ id: 10, content: 'x', stage: 'd' }]),
  },
}));

const { assertionService } = await import('../../src/services/assertion.service.js');

describe('assertion.service.pickNext', () => {
  it('chọn assertion từ pool (mock) -> id=10', async () => {
    const next = await assertionService.pickNext(0, [], new Set());
    expect(next.id).toBe(10);
  });
});