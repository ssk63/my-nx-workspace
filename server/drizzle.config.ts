import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  schema: './src/app/db/schemas/index.ts',
  out: './src/app/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://sathishkumar@localhost:5432/my_nx_workspace'
  },
  verbose: true,
  strict: true
}); 