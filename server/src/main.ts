import express, { Request, Response } from 'express';
import cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

// Import app modules
import { errorHandler } from './app/middleware/error.middleware';
import routes from './app/routes/index';
import { db } from './app/db';

// Load environment variables (find the .env from project root)
dotenv.config();

// Create Express app
const app = express();
const port = process.env['PORT'] || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files if needed
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Test route for database connectivity
app.use('/api/db-test', async (_req: Request, res: Response) => {
  try {
    // Try to query the database with raw SQL
    const result = await db.execute(sql`SELECT COUNT(*) FROM personal_voices`);
    res.json({
      message: 'Database connection successful',
      result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: (error as Error).message
    });
  }
});

// Debug endpoint to see what's being received
app.use('/api/debug', (req: Request, res: Response) => {
  console.log('Debug request body:', JSON.stringify(req.body, null, 2));
  res.json({
    message: 'Received data logged to console',
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  });
});

// Routes
app.use('/api', routes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'App API is running',
    version: '1.0.0',
    environment: process.env['NODE_ENV'] || 'development'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(port, () => {
  console.log(`🚀 API server running at http://localhost:${port}`);
  console.log(`💾 Using database: ${process.env['DATABASE_URL'] || 'postgres://postgres@localhost:5432/app_db'}`);
});

server.on('error', console.error); 