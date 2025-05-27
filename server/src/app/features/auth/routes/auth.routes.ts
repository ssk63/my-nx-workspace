import { Router, Request, Response, NextFunction } from 'express';
import { register, login, forgotPassword, resetPassword } from '../services/auth.service';
import { validateRegistration, validateLogin, validateForgotPassword, validateResetPassword } from '../middleware/validation.middleware';

const router = Router();

// Login route
router.post('/login', validateLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await login(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

// Register route
router.post('/register', validateRegistration, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await register(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

// Forgot password route
router.post('/forgot-password', validateForgotPassword, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await forgotPassword(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

// Reset password route
router.post('/reset-password', validateResetPassword, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await resetPassword(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

export default router; 