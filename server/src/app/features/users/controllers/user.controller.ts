import { Request, Response } from 'express';
import { updateUserProfile } from '../services/user.service';
import type { UserProfileUpdate } from '../types/user.types';
import { Role } from '../../../db/schemas/auth.schema';

// Extend Express Request type to include user
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

export async function updateProfile(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const data: UserProfileUpdate = req.body;
  const updatedUser = await updateUserProfile(userId, data);
  return res.json(updatedUser);
} 