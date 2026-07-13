import { authService } from '../services/auth.service.js';
import { UnauthorizedError } from '../errors/index.js';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(UnauthorizedError('Thiếu token'));
  try {
    req.user = authService.verifyToken(token);   // gắn thông tin user vào req
    next();
  } catch {
    next(UnauthorizedError('Token không hợp lệ hoặc đã hết hạn'));
  }
}