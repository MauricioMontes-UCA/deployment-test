import { env } from '../config/env.js';
import { tokenService } from '../services/token.service.js';

const baseOptions = {
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.sameSite,
  path: '/',
};

export function setAuthCookie(res, token) {
  res.cookie(env.cookie.name, token, {
    ...baseOptions,
    expires: tokenService.getExpiration(token),
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(env.cookie.name, baseOptions);
}
