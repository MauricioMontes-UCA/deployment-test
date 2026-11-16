import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

export function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details && { errors: err.details }),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'Resource already exists' });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Malformed JSON body' });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Internal server error',
    ...(env.nodeEnv === 'development' && { error: err.message }),
  });
}
