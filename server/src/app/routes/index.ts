import { Router } from 'express';
import featuresRouter from '../features/index';

const router = Router();

// Feature routes
router.use(featuresRouter);

export default router; 