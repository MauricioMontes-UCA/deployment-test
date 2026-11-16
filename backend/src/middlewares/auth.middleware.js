import { env } from '../config/env.js';
import { tokenService } from '../services/token.service.js';
import { AppError } from '../utils/AppError.js';

export function authenticate(req, _res, next) {
  const token = req.cookies?.[env.cookie.name];

  if (!token) {
    return next(new AppError('Not authenticated', 401));
  }

  try {
    const payload = tokenService.verify(token);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return next(new AppError('Invalid or expired session', 401));
  }
}
