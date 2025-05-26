import { db } from '../../../db';
import { tenants } from '../../../db/schemas/tenants.schema';
import { users, ROLES, Role } from '../../../db/schemas/users.schema';
import { eq, and } from 'drizzle-orm';
import { 
  Tenant, 
  TenantContext, 
  TenantUser,
  TenantServiceResponse 
} from '../types/tenant.types';

export class TenantService {
  /**
   * Create a new tenant
   */
  static async createTenant(data: { name: string; slug: string; settings?: Record<string, any> }): Promise<TenantServiceResponse<TenantContext>> {
    try {
      // Check if slug already exists
      const existing = await db.select()
        .from(tenants)
        .where(eq(tenants.slug, data.slug))
        .limit(1);

      if (existing.length > 0) {
        return {
          success: false,
          error: 'Tenant slug already exists'
        };
      }

      const result = await db.insert(tenants)
        .values({
          name: data.name,
          slug: data.slug,
          settings: data.settings,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      return {
        success: true,
        data: {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to create tenant'
      };
    }
  }

  /**
   * Get all tenants
   */
  static async getAllTenants(): Promise<TenantServiceResponse<TenantContext[]>> {
    try {
      const result = await db.select()
        .from(tenants)
        .orderBy(tenants.createdAt);

      return {
        success: true,
        data: result.map(tenant => ({
          id: tenant.id,
          name: tenant.name,
          slug: tenant.slug
        }))
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch tenants'
      };
    }
  }

  /**
   * Get tenant by ID
   */
  static async getTenantById(id: string): Promise<TenantServiceResponse<TenantContext>> {
    try {
      const result = await db.select()
        .from(tenants)
        .where(eq(tenants.id, id))
        .limit(1);

      if (!result.length) {
        return {
          success: false,
          error: 'Tenant not found'
        };
      }

      return {
        success: true,
        data: {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch tenant'
      };
    }
  }

  /**
   * Get tenant context by slug
   */
  static async getTenantBySlug(slug: string): Promise<TenantServiceResponse<TenantContext>> {
    try {
      const result = await db.select()
        .from(tenants)
        .where(
          and(
            eq(tenants.slug, slug),
            eq(tenants.isActive, true)
          )
        )
        .limit(1);

      if (!result.length) {
        return {
          success: false,
          error: 'Tenant not found or inactive'
        };
      }

      return {
        success: true,
        data: {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch tenant'
      };
    }
  }

  /**
   * Get tenant user by ID and tenant ID
   */
  static async getTenantUser(userId: string, tenantId: string): Promise<TenantServiceResponse<TenantUser>> {
    try {
      const result = await db.select()
        .from(users)
        .where(
          and(
            eq(users.id, userId),
            eq(users.tenantId, tenantId)
          )
        )
        .limit(1);

      if (!result.length) {
        return {
          success: false,
          error: 'User not found in tenant'
        };
      }

      const role = result[0].role as Role;
      return {
        success: true,
        data: {
          id: result[0].id,
          role,
          hasRole: (r: Role) => role === r,
          hasAnyRole: (roles: Role[]) => roles.includes(role)
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch tenant user'
      };
    }
  }

  /**
   * Create tenant context with user
   */
  static async createTenantContext(
    tenantContext: TenantContext,
    userId?: string
  ): Promise<TenantServiceResponse<Tenant>> {
    try {
      let user: TenantUser | undefined;

      // Get user if authenticated
      if (userId) {
        const userResult = await this.getTenantUser(userId, tenantContext.id);
        if (!userResult.success) {
          return {
            success: false,
            error: userResult.error
          };
        }
        user = userResult.data;
      }

      return {
        success: true,
        data: {
          ...tenantContext,
          role: user?.role ?? ROLES.VIEWER,
          hasRole: user?.hasRole ?? ((role: Role) => role === ROLES.VIEWER),
          hasAnyRole: user?.hasAnyRole ?? ((roles: Role[]) => roles.includes(ROLES.VIEWER))
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to create tenant context'
      };
    }
  }

  /**
   * Update tenant
   */
  static async updateTenant(id: string, data: { name?: string; settings?: Record<string, any> }): Promise<TenantServiceResponse<TenantContext>> {
    try {
      const result = await db.update(tenants)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(tenants.id, id))
        .returning();

      if (!result.length) {
        return {
          success: false,
          error: 'Tenant not found'
        };
      }

      return {
        success: true,
        data: {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to update tenant'
      };
    }
  }

  /**
   * Toggle tenant active status
   */
  static async toggleTenantStatus(id: string, isActive: boolean): Promise<TenantServiceResponse<TenantContext>> {
    try {
      const result = await db.update(tenants)
        .set({
          isActive,
          updatedAt: new Date()
        })
        .where(eq(tenants.id, id))
        .returning();

      if (!result.length) {
        return {
          success: false,
          error: 'Tenant not found'
        };
      }

      return {
        success: true,
        data: {
          id: result[0].id,
          name: result[0].name,
          slug: result[0].slug
        }
      };
    } catch {
      return {
        success: false,
        error: 'Failed to update tenant status'
      };
    }
  }

  /**
   * Delete tenant
   */
  static async deleteTenant(id: string): Promise<TenantServiceResponse<void>> {
    try {
      const result = await db.delete(tenants)
        .where(eq(tenants.id, id))
        .returning();

      if (!result.length) {
        return {
          success: false,
          error: 'Tenant not found'
        };
      }

      return {
        success: true
      };
    } catch {
      return {
        success: false,
        error: 'Failed to delete tenant'
      };
    }
  }
} 