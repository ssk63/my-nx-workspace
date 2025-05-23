import { Router, Request, Response } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { validateRegistration, validateLogin, validateForgotPassword, validateResetPassword } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);

// Protected route example
router.get('/me', authenticate, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

export default router; 