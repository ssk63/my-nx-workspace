import { db } from '../../../db';
import { personalVoices } from '../../../db/schemas/personalVoices.schema';
import { eq, and } from 'drizzle-orm';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';

export const PersonalVoiceDAO = {
  /**
   * Find all personal voices for a tenant
   */
  findAll: async (tenantId: string) => {
    return db.select()
      .from(personalVoices)
      .where(eq(personalVoices.tenantId, tenantId));
  },

  /**
   * Find a personal voice by ID and tenant
   */
  findById: async (id: string, tenantId: string) => {
    return db.select()
      .from(personalVoices)
      .where(
        and(
          eq(personalVoices.id, id),
          eq(personalVoices.tenantId, tenantId)
        )
      )
      .limit(1);
  },

  /**
   * Find a personal voice by key and tenant
   */
  findByKey: async (key: string, tenantId: string) => {
    return db.select()
      .from(personalVoices)
      .where(
        and(
          eq(personalVoices.key, key),
          eq(personalVoices.tenantId, tenantId)
        )
      )
      .limit(1);
  },

  /**
   * Check if a key exists for a tenant
   */
  keyExists: async (key: string, tenantId: string) => {
    const result = await db.select({ key: personalVoices.key })
      .from(personalVoices)
      .where(
        and(
          eq(personalVoices.key, key),
          eq(personalVoices.tenantId, tenantId)
        )
      )
      .limit(1);
    
    return result.length > 0;
  },

  /**
   * Create a new personal voice for a tenant
   */
  create: async (data: CreatePersonalVoiceDto, tenantId: string) => {
    const now = new Date();
    return db.insert(personalVoices)
      .values({
        ...data,
        tenantId,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
  },

  /**
   * Update a personal voice for a tenant
   */
  update: async (id: string, data: UpdatePersonalVoiceDto, tenantId: string) => {
    return db.update(personalVoices)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(personalVoices.id, id),
          eq(personalVoices.tenantId, tenantId)
        )
      )
      .returning();
  },

  /**
   * Delete a personal voice for a tenant
   */
  delete: async (id: string, tenantId: string) => {
    return db.delete(personalVoices)
      .where(
        and(
          eq(personalVoices.id, id),
          eq(personalVoices.tenantId, tenantId)
        )
      );
  }
}; 