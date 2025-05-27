import { Router, Request, Response, NextFunction } from 'express';
import { TenantService } from '../services/tenant.service';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { ROLES } from '../../../db/schemas/users.schema';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const router = Router();

// Apply authentication middleware to all routes
router.use((req: Request, res: Response, next: NextFunction) => {
  authenticate(req, res, next);
});

// Admin authorization middleware
const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== ROLES.ADMIN) {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
  next();
};

// Apply admin authorization to all routes
router.use(requireAdmin);

// Get all tenants
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await TenantService.getAllTenants();
    if (!result.success) {
      res.status(500).json({ message: result.error });
      return;
    }
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get tenant by ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const result = await TenantService.getTenantById(req.params.id);
    if (!result.success) {
      res.status(404).json({ message: result.error });
      return;
    }
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Create new tenant
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await TenantService.createTenant(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Update tenant
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const result = await TenantService.updateTenant(req.params.id, req.body);
    if (!result.success) {
      res.status(404).json({ message: result.error });
      return;
    }
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Toggle tenant status
router.patch('/:id/status', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const result = await TenantService.toggleTenantStatus(req.params.id, req.body.isActive);
    if (!result.success) {
      res.status(404).json({ message: result.error });
      return;
    }
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Delete tenant
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const result = await TenantService.deleteTenant(req.params.id);
    if (!result.success) {
      res.status(404).json({ message: result.error });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 