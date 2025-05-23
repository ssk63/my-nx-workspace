import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../models/user.model';

export function validateRegistration(req: Request, res: Response, next: NextFunction): Response | void {
  const { name, email, password } = req.body as CreateUserDto;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  return next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
  const { email, password } = req.body as LoginDto;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  return next();
}

export function validateForgotPassword(req: Request, res: Response, next: NextFunction): Response | void {
  const { email } = req.body as ForgotPasswordDto;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  return next();
}

export function validateResetPassword(req: Request, res: Response, next: NextFunction): Response | void {
  const { token, password } = req.body as ResetPasswordDto;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  return next();
} 