import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const platformColors = pgTable('platform_colors', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow()
}); 