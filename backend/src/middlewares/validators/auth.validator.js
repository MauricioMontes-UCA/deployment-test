import { body } from 'express-validator';
import { validate } from '../validate.middleware.js';

const email = () =>
  body('email')
    .isString()
    .withMessage('Email is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('A valid email is required')
    .bail()
    .isLength({ max: 255 })
    .withMessage('Email must be at most 255 characters')
    .toLowerCase();

export const registerValidator = [
  body('name')
    .isString()
    .withMessage('Name is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Name must be at most 100 characters'),
  email(),
  body('password')
    .isString()
    .withMessage('Password is required')
    .bail()
    // bcrypt only uses the first 72 bytes of the password.
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must be between 8 and 72 characters'),
  validate,
];

export const loginValidator = [
  email(),
  body('password')
    .isString()
    .withMessage('Password is required')
    .bail()
    .notEmpty()
    .withMessage('Password is required'),
  validate,
];
