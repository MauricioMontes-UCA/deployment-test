import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

// Runs after a list of express-validator chains and stops the request
// if any of them failed. Errors are returned as { field: message }.
export function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = Object.fromEntries(
    Object.entries(result.mapped()).map(([field, error]) => [field, error.msg]),
  );
  return next(new AppError('Validation failed', 400, errors));
}
