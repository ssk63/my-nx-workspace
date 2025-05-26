import type { Request, Response, NextFunction } from 'express';
import { PersonalVoiceService } from '../services/personalVoice.service';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';
import type { Tenant } from '../../tenants/types/tenant.types';

declare module 'express' {
  interface Request {
    tenant?: Tenant;
  }
}

/**
 * Get all personal voices
 */
export const getAllPersonalVoices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const voices = await PersonalVoiceService.getAllVoices(req.tenant.id);
    return res.status(200).json(voices);
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
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const { id } = req.params;
    const voice = await PersonalVoiceService.getVoiceById(id, req.tenant.id);
    return res.status(200).json(voice);
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
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const { key } = req.params;
    const voice = await PersonalVoiceService.getVoiceByKey(key, req.tenant.id);
    return res.status(200).json(voice);
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
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const personalVoiceData: CreatePersonalVoiceDto = req.body;
    const newVoice = await PersonalVoiceService.createVoice(personalVoiceData, req.tenant.id);
    return res.status(201).json(newVoice);
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
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const { id } = req.params;
    const updateData: UpdatePersonalVoiceDto = req.body;
    const updatedVoice = await PersonalVoiceService.updateVoice(id, updateData, req.tenant.id);
    return res.status(200).json(updatedVoice);
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
): Promise<Response | void> => {
  try {
    if (!req.tenant) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }
    const { id } = req.params;
    await PersonalVoiceService.deleteVoice(id, req.tenant.id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 