import { Router } from 'express';
import { setPlatformColors, getAllColors, PlatformColors, ColorKey } from '../services/platform-colors.service';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Set all platform colors
router.put('/', async (req, res): Promise<void> => {
  try {
    const colors = req.body as PlatformColors;
    
    // Validate required color keys
    const requiredKeys: ColorKey[] = ['primary', 'primaryLight', 'secondary', 'secondaryLight'];
    const missingKeys = requiredKeys.filter(key => !colors[key]);
    
    if (missingKeys.length > 0) {
      res.status(400).json({
        status: 400,
        message: `Missing required color keys: ${missingKeys.join(', ')}`
      });
      return;
    }

    const result = await setPlatformColors(colors);
    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error setting platform colors:', error);
    res.status(500).json({ 
      status: 500, 
      message: 'Failed to update platform colors' 
    });
  }
});

// Get all colors
router.get('/', async (req, res) => {
  try {
    const result = await getAllColors();
    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error getting platform colors:', error);
    res.status(500).json({ 
      status: 500, 
      message: 'Failed to retrieve platform colors' 
    });
  }
});

export default router; 