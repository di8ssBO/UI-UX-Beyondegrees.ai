import { ValidationError } from '../errors/index.js';

// validate(schema) trả về middleware kiểm tra body/params/query
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body, params: req.params, query: req.query,
  });
  if (!result.success) {
    // Gom lỗi gọn gàng để FE biết field nào sai
    return next(ValidationError(result.error.flatten()));
  }
  // Gán lại dữ liệu đã được zod làm sạch & ép kiểu
  if (result.data.body) req.body = result.data.body;
  next();
};