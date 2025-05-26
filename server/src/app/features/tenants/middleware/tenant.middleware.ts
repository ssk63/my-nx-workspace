import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../services/tenant.service';
import { Tenant } from '../types/tenant.types';

declare module 'express' {
  interface Request {
    tenant?: Tenant;
  }
}

export async function tenantMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  // Skip tenant middleware for tenant management routes
  if (req.path.startsWith('/tenants')) {
    return next();
  }

  try {
    // Get tenant slug from header or subdomain
    const tenantSlug = req.headers['x-tenant-slug'] as string;
    
    if (!tenantSlug) {
      return res.status(400).json({ message: 'Tenant context is required' });
    }

    // Get tenant context
    const tenantResult = await TenantService.getTenantBySlug(tenantSlug);
    if (!tenantResult.success || !tenantResult.data) {
      return res.status(404).json({ message: tenantResult.error ?? 'Tenant not found' });
    }

    // Create tenant context with user
    const contextResult = await TenantService.createTenantContext(
      tenantResult.data,
      req.user?.id
    );

    if (!contextResult.success || !contextResult.data) {
      return res.status(500).json({ message: contextResult.error ?? 'Error creating tenant context' });
    }

    // Attach tenant context to request
    req.tenant = contextResult.data;
    return next();
  } catch {
    return res.status(500).json({ message: 'Error processing tenant context' });
  }
} 