import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const tokenService = {
  sign(user) {
    return jwt.sign({ sub: user.id, email: user.email }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });
  },

  verify(token) {
    return jwt.verify(token, env.jwt.secret);
  },

  // Expiration date of a token, used to align the cookie lifetime with the JWT.
  getExpiration(token) {
    const { exp } = jwt.decode(token);
    return new Date(exp * 1000);
  },
};
