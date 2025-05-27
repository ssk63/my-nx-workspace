import { Role } from '../../../db/schemas/auth.schema';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  role: Role;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

export interface TenantContext {
  id: string;
  name: string;
  slug: string;
}

export interface TenantUser {
  id: string;
  role: Role;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

export interface TenantServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 