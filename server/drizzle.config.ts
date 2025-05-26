import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  schema: './src/app/db/schema.ts',
  out: './src/app/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/app_db'
  }
}); 