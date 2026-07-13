// tests/integration/assessment.test.js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';

describe('Assessment API', () => {
  it('tạo phiên hợp lệ -> 201', async () => {
    const r = await request(app).post('/api/v1/assessments')
      .send({ device: 'mobile', locale: 'en' });
    expect(r.status).toBe(201);
    expect(r.body.data).toHaveProperty('id');
  });

  it('chặn nhãn "Neutral" -> 422 (quyết định Buổi 9)', async () => {
    const r = await request(app)
      .post('/api/v1/assessments/123e4567-e89b-12d3-a456-426614174000/answers')
      .send({ assertion_id: 1, position: 1, answer_value: 2, answer_label: 'Neutral', stage: 'd' });
    expect(r.status).toBe(422);
  });

  it('route lạ -> 404', async () => {
    const r = await request(app).get('/api/v1/khong-co');
    expect(r.status).toBe(404);
  });
});