import { pgTable, uuid, timestamp, json, uniqueIndex } from 'drizzle-orm/pg-core';
import { tenants } from './tenants.schema';

export const themes = pgTable('themes', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  colors: json('colors').$type<{
    primary: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
  }>().notNull(),
  logo: json('logo').$type<{
    primary: string;
    dark?: string;
    light?: string;
  }>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  tenantUnique: uniqueIndex('tenant_unique').on(table.tenantId)
})); 