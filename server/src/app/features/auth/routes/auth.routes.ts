import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../services/auth.service';
import { validateRegistration, validateLogin, validateForgotPassword, validateResetPassword } from '../middleware/validation.middleware';

const authRouter = Router();

authRouter.post('/register', validateRegistration, async (req, res) => {
  const result = await register(req.body);
  res.status(result.status).json(result);
});

authRouter.post('/login', validateLogin, async (req, res) => {
  const result = await login(req.body);
  res.status(result.status).json(result);
});

authRouter.post('/forgot-password', validateForgotPassword, async (req, res) => {
  const result = await forgotPassword(req.body);
  res.status(result.status).json(result);
});

authRouter.post('/reset-password', validateResetPassword, async (req, res) => {
  const result = await resetPassword(req.body);
  res.status(result.status).json(result);
});

export default authRouter; 