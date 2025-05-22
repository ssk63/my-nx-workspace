import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function runMigrations() {
  // Database connection string - trust auth method
  const connectionString = process.env['DATABASE_URL'] || 'postgres://postgres@localhost:5432/app_db';
  
  // Create a postgres client for migrations
  const migrationClient = postgres(connectionString, { max: 1 });
  
  // Create a migration instance
  const db = drizzle(migrationClient);
  
  // Run migrations
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: path.resolve(__dirname, 'migrations') });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close the connection when done
    await migrationClient.end();
  }
}

// Run migrations
runMigrations(); 