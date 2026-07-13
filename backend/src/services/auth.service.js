import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';

export const authService = {
  hashPassword: (plain) => bcrypt.hash(plain, 10),         // băm 10 vòng salt
  verifyPassword: (plain, hash) => bcrypt.compare(plain, hash),

  signToken: (payload) =>
    jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN }),

  verifyToken: (token) => jwt.verify(token, env.JWT_SECRET),
};