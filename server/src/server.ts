import express from 'express';
import cors from 'cors';
import { env } from './app/config/environment';
import routes from './app/routes';
import { errorHandler } from './app/middleware/error.middleware';

// Create Express app
const app = express();
const port = env.server.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'PersonalVoice API is running',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Using database: ${env.database.url.replace(/:[^:]*@/, ':***@')}`);
}); 