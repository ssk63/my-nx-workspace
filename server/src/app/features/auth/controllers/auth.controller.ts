import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  try {
    console.error('Register request body:', JSON.stringify(req.body, null, 2));
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const result = await AuthService.register(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error('Register error details:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await AuthService.login(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const result = await AuthService.forgotPassword(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const result = await AuthService.resetPassword(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
} 