// Thay vì try/catch trong mỗi controller, bọc 1 lần.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);