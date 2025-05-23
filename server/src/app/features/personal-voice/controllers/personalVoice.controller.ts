import type { Request, Response, NextFunction } from 'express';
import { PersonalVoiceService } from '../services/personalVoice.service';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';
import { personalVoices } from '../../../db/schemas/personalVoices.schema';

/**
 * Get all personal voices
 */
export const getAllPersonalVoices = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const voices = await PersonalVoiceService.getAllVoices();
    res.status(200).json(voices);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a personal voice by ID
 */
export const getPersonalVoiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const voice = await PersonalVoiceService.getVoiceById(id);
    res.status(200).json(voice);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a personal voice by key
 */
export const getPersonalVoiceByKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key } = req.params;
    const voice = await PersonalVoiceService.getVoiceByKey(key);
    res.status(200).json(voice);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new personal voice
 */
export const createPersonalVoice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const personalVoiceData: CreatePersonalVoiceDto = req.body;
    const newVoice = await PersonalVoiceService.createVoice(personalVoiceData);
    res.status(201).json(newVoice);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a personal voice
 */
export const updatePersonalVoice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdatePersonalVoiceDto = req.body;
    const updatedVoice = await PersonalVoiceService.updateVoice(id, updateData);
    res.status(200).json(updatedVoice);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a personal voice
 */
export const deletePersonalVoice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await PersonalVoiceService.deleteVoice(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 