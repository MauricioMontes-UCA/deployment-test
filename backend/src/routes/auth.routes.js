import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { loginValidator, registerValidator } from '../middlewares/validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
