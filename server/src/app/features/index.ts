import { Router } from 'express';
import { tenantRouter } from './tenants';
import { authRouter } from './auth';
import { personalVoiceRouter } from './personal-voice';
import { themeRouter } from './themes';

// Main features router
const featuresRouter = Router();

// Register routes
featuresRouter.use('/tenants', tenantRouter);
featuresRouter.use('/auth', authRouter);
featuresRouter.use('/personal-voices', personalVoiceRouter);
featuresRouter.use('/themes', themeRouter);

// Export the main features router
export default featuresRouter;

// Export individual features for use elsewhere
export * from './personal-voice';
export * from './auth'; 