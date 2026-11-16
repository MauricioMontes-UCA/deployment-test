import { matchedData } from 'express-validator';
import { authService } from '../services/auth.service.js';
import { clearAuthCookie, setAuthCookie } from '../utils/authCookie.js';

// HTTP layer: translates requests into service calls and results into responses.
// The JWT travels only in an httpOnly cookie; it is never sent in the response body.
// Express 5 forwards rejected promises to the error middleware automatically.
export const authController = {
  async register(req, res) {
    const { name, email, password } = matchedData(req);
    const { user, token } = await authService.register({ name, email, password });
    setAuthCookie(res, token);
    res.status(201).json({ user });
  },

  async login(req, res) {
    const { email, password } = matchedData(req);
    const { user, token } = await authService.login({ email, password });
    setAuthCookie(res, token);
    res.status(200).json({ user });
  },

  logout(_req, res) {
    clearAuthCookie(res);
    res.status(204).end();
  },

  async me(req, res) {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({ user });
  },
};
