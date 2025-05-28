import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
  const result = userUpdateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid user update payload', errors: result.error.errors });
  }
  req.body = result.data;
  return next();
} 