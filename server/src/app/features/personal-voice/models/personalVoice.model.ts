import { db } from '../../../db';
import { personalVoices } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';

export const PersonalVoiceDAO = {
  /**
   * Find all personal voices
   */
  findAll: async () => {
    return db.select().from(personalVoices);
  },

  /**
   * Find a personal voice by ID
   */
  findById: async (id: string) => {
    return db.select()
      .from(personalVoices)
      .where(eq(personalVoices.id, id))
      .limit(1);
  },

  /**
   * Find a personal voice by key
   */
  findByKey: async (key: string) => {
    return db.select()
      .from(personalVoices)
      .where(eq(personalVoices.key, key))
      .limit(1);
  },

  /**
   * Check if a key exists
   */
  keyExists: async (key: string) => {
    const result = await db.select({ key: personalVoices.key })
      .from(personalVoices)
      .where(eq(personalVoices.key, key))
      .limit(1);
    
    return result.length > 0;
  },

  /**
   * Create a new personal voice
   */
  create: async (data: CreatePersonalVoiceDto) => {
    const now = new Date();
    return db.insert(personalVoices)
      .values({
        ...data,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
  },

  /**
   * Update a personal voice
   */
  update: async (id: string, data: UpdatePersonalVoiceDto) => {
    return db.update(personalVoices)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(personalVoices.id, id))
      .returning();
  },

  /**
   * Delete a personal voice
   */
  delete: async (id: string) => {
    return db.delete(personalVoices)
      .where(eq(personalVoices.id, id));
  }
}; 