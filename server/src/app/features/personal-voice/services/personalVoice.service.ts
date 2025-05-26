import { PersonalVoiceDAO } from '../models/personalVoice.model';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';
import { personalVoices } from '../../../db/schemas/personalVoices.schema';

class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}

class DuplicateKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateKeyError';
  }
}

export const PersonalVoiceService = {
  /**
   * Get all personal voices
   */
  getAllVoices: async (tenantId: string) => {
    return PersonalVoiceDAO.findAll(tenantId);
  },

  /**
   * Get a personal voice by ID
   */
  getVoiceById: async (id: string, tenantId: string) => {
    const voices = await PersonalVoiceDAO.findById(id, tenantId);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }
    return voices[0];
  },

  /**
   * Get a personal voice by key
   */
  getVoiceByKey: async (key: string, tenantId: string) => {
    const voices = await PersonalVoiceDAO.findByKey(key, tenantId);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }
    return voices[0];
  },

  /**
   * Create a new personal voice
   */
  createVoice: async (voiceData: CreatePersonalVoiceDto, tenantId: string) => {
    // Check if a voice with the same key already exists
    const keyExists = await PersonalVoiceDAO.keyExists(voiceData.key, tenantId);
    if (keyExists) {
      throw new DuplicateKeyError('A personal voice with this key already exists');
    }

    const newVoice = await PersonalVoiceDAO.create(voiceData, tenantId);
    return newVoice[0];
  },

  /**
   * Update a personal voice
   */
  updateVoice: async (id: string, updateData: UpdatePersonalVoiceDto, tenantId: string) => {
    // Check if the personal voice exists
    const voices = await PersonalVoiceDAO.findById(id, tenantId);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }

    // If key is being updated, check for uniqueness
    if (updateData.key) {
      const existingVoices = await PersonalVoiceDAO.findByKey(updateData.key, tenantId);
      if (existingVoices.length > 0 && existingVoices[0].id !== id) {
        throw new DuplicateKeyError('A personal voice with this key already exists');
      }
    }

    const updatedVoice = await PersonalVoiceDAO.update(id, updateData, tenantId);
    return updatedVoice[0];
  },

  /**
   * Delete a personal voice
   */
  deleteVoice: async (id: string, tenantId: string) => {
    // Check if the personal voice exists
    const voices = await PersonalVoiceDAO.findById(id, tenantId);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }

    await PersonalVoiceDAO.delete(id, tenantId);
    return true;
  }
};

export { ResourceNotFoundError, DuplicateKeyError }; 