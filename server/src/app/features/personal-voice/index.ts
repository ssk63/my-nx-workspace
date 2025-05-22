import { Router } from 'express';
import personalVoiceRoutes from './routes/personalVoice.routes';

// Export the feature router
export const personalVoiceRouter = Router();
personalVoiceRouter.use('/personal-voices', personalVoiceRoutes);

// Export feature components for use in other modules
export * from './models/personalVoice.model';
export * from './services/personalVoice.service';
export * from './types';
export * from './middleware'; 