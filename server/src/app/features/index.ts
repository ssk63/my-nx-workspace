import { Router } from 'express';
import { personalVoiceRouter } from './personal-voice';
import { authRouter } from './auth';
import platformColorsRouter from './platform/routes/platform-colors.routes';

// Main features router
const featuresRouter = Router();

// Register feature routers
featuresRouter.use('/auth', authRouter);
featuresRouter.use(personalVoiceRouter);
featuresRouter.use('/platform/colors', platformColorsRouter);

// Export the main features router
export default featuresRouter;

// Export individual features for use elsewhere
export * from './personal-voice';
export * from './auth'; 