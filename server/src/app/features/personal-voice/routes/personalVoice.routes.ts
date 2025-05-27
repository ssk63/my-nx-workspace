import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllPersonalVoices,
  getPersonalVoiceById,
  getPersonalVoiceByKey,
  createPersonalVoice,
  updatePersonalVoice,
  deletePersonalVoice
} from '../controllers/personalVoice.controller';
import { validateCreatePersonalVoice, validateUpdatePersonalVoice } from '../middleware';

const router = Router();

// Get all personal voices
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getAllPersonalVoices(req, res, next);
});

// Get a personal voice by ID
router.get('/id/:id', (req: Request, res: Response, next: NextFunction) => {
  getPersonalVoiceById(req, res, next);
});

// Get a personal voice by key
router.get('/key/:key', (req: Request, res: Response, next: NextFunction) => {
  getPersonalVoiceByKey(req, res, next);
});

// Create a new personal voice
router.post('/', validateCreatePersonalVoice, (req: Request, res: Response, next: NextFunction) => {
  createPersonalVoice(req, res, next);
});

// Update a personal voice
router.put('/:id', validateUpdatePersonalVoice, (req: Request, res: Response, next: NextFunction) => {
  updatePersonalVoice(req, res, next);
});

// Delete a personal voice
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  deletePersonalVoice(req, res, next);
});

export default router; 