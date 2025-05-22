import { Router } from 'express';
import featuresRouter from '../features';

const router = Router();

// Feature routes
router.use(featuresRouter);

export default router; 