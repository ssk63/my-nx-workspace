import { Router } from 'express';
import { register, login, refreshToken } from '../services/auth.service';
import { z } from 'zod';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  tenantId: z.string().uuid(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await register(data);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await login(data);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
});

// Refresh token route
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      throw new Error('Refresh token is required');
    }
    const result = await refreshToken(token);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 