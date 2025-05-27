import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config();

export default {
  schema: path.resolve(__dirname, 'src/app/db/schemas/*.ts'),
  out: path.resolve(__dirname, 'src/app/db/migrations'),
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'sathishkumar',
    database: 'app_db',
    ssl: false
  }
} satisfies Config; 