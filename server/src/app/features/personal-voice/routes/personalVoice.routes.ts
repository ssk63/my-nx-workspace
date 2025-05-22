import { Router } from 'express';
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
router.get('/', getAllPersonalVoices);

// Get a personal voice by ID
router.get('/id/:id', getPersonalVoiceById);

// Get a personal voice by key
router.get('/key/:key', getPersonalVoiceByKey);

// Create a new personal voice
router.post('/', validateCreatePersonalVoice, createPersonalVoice);

// Update a personal voice
router.put('/:id', validateUpdatePersonalVoice, updatePersonalVoice);

// Delete a personal voice
router.delete('/:id', deletePersonalVoice);

export default router; 