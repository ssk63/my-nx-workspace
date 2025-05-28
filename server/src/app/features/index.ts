import { Router } from 'express';
import authRoutes from './auth/routes/auth.routes';
import tenantRoutes from './tenants/routes/tenant.routes';
import personalVoiceRoutes from './personal-voice/routes/personalVoice.routes';
import themeRoutes from './themes/routes/theme.routes';
import userRoutes from './users/routes/user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tenants', tenantRoutes);
router.use('/personal-voices', personalVoiceRoutes);
router.use('/themes', themeRoutes);
router.use('/users', userRoutes);

export default router; 