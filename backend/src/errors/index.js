import { AppError } from './app-error.js';

export const BadRequestError   = (m = 'Bad request')  => new AppError(400, 'BAD_REQUEST', m);
export const UnauthorizedError = (m = 'Unauthorized') => new AppError(401, 'UNAUTHORIZED', m);
export const ForbiddenError    = (m = 'Forbidden')    => new AppError(403, 'FORBIDDEN', m);
export const NotFoundError     = (m = 'Not found')    => new AppError(404, 'NOT_FOUND', m);
export const ConflictError     = (m = 'Conflict')     => new AppError(409, 'CONFLICT', m);
export const ValidationError   = (details)            => new AppError(422, 'VALIDATION', 'Dữ liệu không hợp lệ', details);