import { Router, Request, Response } from 'express';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { validateUserUpdate } from '../middleware/validateUserUpdate';
import { updateProfile } from '../controllers/user.controller';
import type { UserProfileUpdate } from '../types/user.types';

const router = Router();

router.patch('/me', authenticate, validateUserUpdate, updateProfile);

export default router; 