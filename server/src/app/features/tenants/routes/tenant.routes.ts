import { Router } from 'express';
import { TenantService } from '../services/tenant.service';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { ROLES } from '../../../db/schemas/users.schema';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Admin authorization middleware
const requireAdmin = (req: any, res: any, next: any) => {
  if (!req.tenant?.hasRole(ROLES.ADMIN)) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Apply admin authorization to all routes
router.use(requireAdmin);

// Get all tenants
router.get('/', async (req, res) => {
  const result = await TenantService.getAllTenants();
  if (!result.success) {
    return res.status(500).json({ message: result.error });
  }
  return res.json(result.data);
});

// Get tenant by ID
router.get('/:id', async (req, res) => {
  const result = await TenantService.getTenantById(req.params.id);
  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }
  return res.json(result.data);
});

// Create new tenant
router.post('/', async (req, res) => {
  const result = await TenantService.createTenant(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error });
  }
  return res.status(201).json(result.data);
});

// Update tenant
router.put('/:id', async (req, res) => {
  const result = await TenantService.updateTenant(req.params.id, req.body);
  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }
  return res.json(result.data);
});

// Toggle tenant status
router.patch('/:id/status', async (req, res) => {
  const result = await TenantService.toggleTenantStatus(req.params.id, req.body.isActive);
  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }
  return res.json(result.data);
});

// Delete tenant
router.delete('/:id', async (req, res) => {
  const result = await TenantService.deleteTenant(req.params.id);
  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }
  return res.status(204).send();
});

export default router; 