import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const env = {
  database: {
    url: process.env['DATABASE_URL'] || 'postgres://postgres@localhost:5432/app_db',
  },
  server: {
    port: parseInt(process.env['PORT'] || '3001', 10),
  }
}; 