import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './app/middleware/error.middleware';
import routesRouter from './app/routes'; 

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env['PORT'] || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routesRouter);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'App API is running',
    version: '1.0.0',
    environment: process.env['NODE_ENV'] || 'development'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 API server running at http://localhost:${port}`);
  console.log(`💾 Using database: ${process.env['DATABASE_URL'] || 'postgres://sathishkumar@localhost:5432/app_db'}`);
}); 