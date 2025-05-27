import { Router, Request, Response, NextFunction } from 'express';
import { TenantService } from '../services/tenant.service';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { ROLES } from '../../../db/schemas/auth.schema';
import { register as registerUser } from '../../auth/services/auth.service';
import { sendEmail } from '../../auth/services/email.service';
import { z } from 'zod';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const router = Router();

// --- Public Tenant Registration Endpoint ---
const tenantRegisterSchema = z.object({
  tenantName: z.string().min(2),
  tenantSlug: z.string().min(2).optional(),
  user: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    requestedRole: z.string().optional() // user can request a role
  })
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { tenantName, tenantSlug, user } = tenantRegisterSchema.parse(req.body);
    // 1. Create tenant
    const slug = tenantSlug || tenantName.toLowerCase().replace(/\s+/g, '-');
    const tenantResult = await TenantService.createTenant({ name: tenantName, slug });
    if (!tenantResult.success || !tenantResult.data) {
      return res.status(400).json({ error: tenantResult.error || 'Failed to create tenant' });
    }
    // 2. Register user as admin for this tenant (first user is always admin)
    const userResult = await registerUser({
      ...user,
      tenantId: tenantResult.data.id
      // Do NOT pass role, backend should assign 'admin' for first user
    });
    if (userResult.status !== 201 || !userResult.user) {
      return res.status(400).json({ error: userResult.message || 'Failed to create user' });
    }
    // 3. If requestedRole is present and not 'admin', store it for admin approval (pseudo-code, implement as needed)
    if (user.requestedRole && user.requestedRole !== 'admin') {
      // Store user.requestedRole in a pending requests table for this tenant
      // e.g., await PendingRoleRequestService.create({ userId: userResult.user.id, tenantId: tenantResult.data.id, requestedRole: user.requestedRole });
      // Notify admins for approval (pseudo-code)
      // await notifyAdminsOfRoleRequest(tenantResult.data.id, userResult.user.id, user.requestedRole);
    }
    // 4. Send verification email (pseudo, adapt as needed)
    await sendEmail({
      to: user.email,
      subject: 'Welcome to ' + tenantName,
      html: `<h1>Welcome!</h1><p>Your organization <b>${tenantName}</b> has been created. Please verify your email to activate your account.</p>`
    });
    // 5. Respond
    return res.status(201).json({
      message: 'Tenant and user created. Please verify your email.',
      tenantId: tenantResult.data.id,
      userId: userResult.user.id
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
});

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