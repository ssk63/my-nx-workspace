import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config();

async function main() {
  const pool = new Pool({
    host: process.env['DB_HOST'] || 'localhost',
    port: Number(process.env['DB_PORT']) || 5432,
    user: process.env['DB_USER'] || 'sathishkumar',
    database: process.env['DB_NAME'] || 'app_db'
  });

  const db = drizzle(pool);

  console.log('Running migrations...');

  // Get the absolute path to the migrations folder
  const migrationsFolder = path.resolve(__dirname, 'migrations');
  console.log('Migrations folder:', migrationsFolder);

  await migrate(db, { migrationsFolder });

  console.log('Migrations completed successfully');

  await pool.end();
}

main().catch((err) => {
  console.error('Migration failed');
  console.error(err);
  process.exit(1);
}); 