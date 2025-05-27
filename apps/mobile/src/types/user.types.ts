import type { Tenant } from './tenant.types';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenants: Tenant[];
} 