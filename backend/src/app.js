// src/app.js
import express from 'express';
import compression from 'compression';
import pinoHttp from 'pino-http';
import v1 from './api/v1/index.js';
import { logger } from './config/logger.js';
import { helmetMw, corsMw, apiLimiter } from './middlewares/security.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { NotFoundError } from './errors/index.js';

export const app = express();

app.disable('x-powered-by');             // giấu việc dùng Express
app.use(pinoHttp({ logger }));           // log mỗi request
app.use(helmetMw);
app.use(corsMw);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use('/api/v1', apiLimiter);

app.use('/api/v1', v1);

app.use((_req, _res, next) => next(NotFoundError('Route không tồn tại')));
app.use(errorHandler);                   // luôn cuối cùng