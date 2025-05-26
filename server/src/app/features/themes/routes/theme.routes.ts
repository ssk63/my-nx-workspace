import { Router, Request, Response, NextFunction } from 'express';
import { ThemeService } from '../services/theme.service';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { ROLES } from '../../../db/schemas/users.schema';
import { Tenant } from '../../tenants/types/tenant.types';

declare module 'express' {
  interface Request {
    tenant?: Tenant;
  }
}

const router = Router();
const themeService = new ThemeService();

// Middleware
const requireTenant = (req: Request, res: Response, next: NextFunction) => {
  if (!req.tenant) {
    return res.status(401).json({ message: 'Tenant context required' });
  }
  return next();
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.tenant?.hasRole(ROLES.ADMIN)) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  return next();
};

// Apply middleware
router.use(authenticate, requireTenant);

// Routes
router.get('/', async (req: Request, res: Response) => {
  const tenant = req.tenant as Tenant;
  const result = await themeService.getTheme(tenant.id);
  return result.success
    ? res.json(result.data)
    : res.status(404).json({ message: result.error });
});

router.post('/', requireAdmin, async (req: Request, res: Response) => {
  const tenant = req.tenant as Tenant;
  const result = await themeService.upsertTheme(tenant.id, req.body);
  return result.success
    ? res.status(201).json(result.data)
    : res.status(400).json({ message: result.error });
});

router.delete('/', requireAdmin, async (req: Request, res: Response) => {
  const tenant = req.tenant as Tenant;
  const result = await themeService.deleteTheme(tenant.id);
  return result.success
    ? res.status(204).send()
    : res.status(404).json({ message: result.error });
});

export default router; 