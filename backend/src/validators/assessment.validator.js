import { z } from 'zod';

// Body khi bắt đầu phiên làm bài
export const startSchema = z.object({
  body: z.object({
    device: z.enum(['mobile', 'desktop']),
    locale: z.enum(['en', 'ar', 'vi', 'hi', 'fr']),
    profileId: z.string().uuid().optional(),
  }),
});

// Body khi lưu 1 câu trả lời
export const answerSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    assertion_id: z.number().int().positive(),
    position: z.number().int().min(1).max(30),
    answer_value: z.number().int().min(1).max(5),          // thang 1–5
    answer_label: z.enum([
      'Absolutely agree', 'Agree', 'Unsure', 'Disagree', 'Totally disagree',
    ]),                                                     // KHÔNG có "Neutral"
    stage: z.enum(['d', 'm', 'u']),
  }),
});

// Chỉ cần :id là uuid
export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});