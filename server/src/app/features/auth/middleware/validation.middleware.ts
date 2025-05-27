import { Request, Response, NextFunction } from 'express';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from '../types/user.types';

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as LoginDto;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  return next();
}

export function validateRegistration(req: Request, res: Response, next: NextFunction) {
  const { email, password, firstName, lastName, tenantId } = req.body as RegisterDto;

  if (!email || !password || !firstName || !lastName || !tenantId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (typeof firstName !== 'string' || firstName.length < 2) {
    return res.status(400).json({ message: 'First name must be at least 2 characters long' });
  }

  if (typeof lastName !== 'string' || lastName.length < 2) {
    return res.status(400).json({ message: 'Last name must be at least 2 characters long' });
  }

  if (typeof tenantId !== 'string') {
    return res.status(400).json({ message: 'Invalid tenant ID' });
  }

  return next();
}

export function validateForgotPassword(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body as ForgotPasswordDto;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  return next();
}

export function validateResetPassword(req: Request, res: Response, next: NextFunction) {
  const { token, password } = req.body as ResetPasswordDto;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password are required' });
  }

  if (typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid token format' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  return next();
} 