import { pgTable, uuid, text, boolean, json, timestamp } from 'drizzle-orm/pg-core';

export const personalVoices = pgTable('personal_voices', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  profile: json('profile').$type<{
    jobTitle: string;
    geographicalFocus: string;
    skillsAndExpertise: string[];
  }>().notNull(),
  toneOfVoice: json('tone_of_voice').$type<{
    writingSample: string;
    toneOfVoiceAttributes: string[];
  }>().notNull(),
  audience: json('audience').$type<{
    audienceDemographics: string[];
  }>().notNull(),
  fineTuning: json('fine_tuning').$type<{
    temperature: number;
    engagementStyle: string;
    useEmojis: boolean;
    translate: boolean;
    translateTo: string;
  }>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 