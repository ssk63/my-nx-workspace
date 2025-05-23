import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection string - trust auth method
const connectionString = process.env['DATABASE_URL'] || 'postgres://postgres@localhost:5432/app_db';

// Create a postgres client
const client = postgres(connectionString);

// Create a drizzle ORM instance
export const db = drizzle(client, { schema });

export { schema }; 