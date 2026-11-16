import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository.js';
import { tokenService } from './token.service.js';
import { AppError } from '../utils/AppError.js';

const SALT_ROUNDS = 12;

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

// Business logic layer: knows nothing about HTTP or cookies.
export const authService = {
  async register({ name, email, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new AppError('Email is already registered', 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create({ name, email, passwordHash });

    return { user: toPublicUser(user), token: tokenService.sign(user) };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmailWithPassword(email);
    const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!valid) {
      throw new AppError('Invalid email or password', 401);
    }

    return { user: toPublicUser(user), token: tokenService.sign(user) };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return toPublicUser(user);
  },
};
